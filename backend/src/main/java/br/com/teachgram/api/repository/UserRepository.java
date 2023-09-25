package br.com.teachgram.api.repository;

import br.com.teachgram.api.domain.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String> {

    Optional<User> findByEmail(String email);

    @Query("select new User(u.id, u.email, u.password) from User u where u.email = :email")
    Optional<UserDetails> findUserDetailsByEmail(String email);

    @Query("select new User(u.id, u.email, u.password) from User u where u.id = :userId")
    Optional<UserDetails> findUserDetailsById(String userId);

    Boolean existsByEmail(String email);

    Boolean existsByPhone(String phone);

    @Query("select u from User  u where u.id = :id")
    Optional<User> findFriendById(String id);

    @Query("SELECT COUNT(f) FROM Friendship f WHERE f.firstUser.id = :userId")
    Long countFriendsForUser(String userId);

    @Query("SELECT u FROM User u JOIN Friendship f ON u.id = f.secondUser.id WHERE f.firstUser.id = :id")
    Page<User> getFriends(String id, Pageable pageable);

    @Query("SELECT u FROM User u JOIN Friendship f ON (u.id = f.secondUser.id) WHERE f.firstUser.id = :id AND f.secondUser.id = :id1")
    Optional<User> findFriend(String id, String id1);
}
