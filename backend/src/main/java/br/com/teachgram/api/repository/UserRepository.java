package br.com.teachgram.api.repository;

import br.com.teachgram.api.domain.friendship.Friendship;
import br.com.teachgram.api.domain.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String> {

    Optional<User> findByEmail(String email);

    @Query("select new User(u.id, u.email, u.password, u.deleted) from User u where u.email = :email")
    Optional<UserDetails> findUserDetailsByEmail(String email);

    @Query("select new User(u.id, u.email, u.password, u.deleted) from User u where u.id = :userId")
    Optional<UserDetails> findUserDetailsById(String userId);

    Boolean existsByEmail(String email);

    Boolean existsByEmailAndIdNot(String email, String id);

    Boolean existsByPhoneAndIdNot(String phone, String id);

    Boolean existsByPhone(String phone);

    Boolean existsByUsername(String username);

    Boolean existsByUsernameAndIdNot(String username, String id);

    @Query("select u from User  u where u.id = :id")
    Optional<User> findFriendById(String id);

    @Query("select count(f) from Friendship f where f.firstUser.id = :userId")
    Long countFriendsForUser(String userId);

    Optional<User> findByUsername(String username);
}
