package br.com.teachgram.api.repository;

import br.com.teachgram.api.domain.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String> {
    @Query("select u from User u where u.email = ?1")
    Optional<UserDetails> findDetailsByEmail(String email);

    Optional<User> findByEmail(String email);

    @Query("select new User(u.id, u.email, u.password) from User u where u.email = :email")
    UserDetails findTopByEmail(String email);

    Boolean existsByEmail(String email);

    Boolean existsByPhone(String phone);

    @Query("select u from User  u where u.id = :id")
    Optional<User> findByIdWithPosts(String id);

    @Query("select count(f) from User u join u.friends f where u.id = :userId")
    Long countFriendsForUser(String userId);

    @Query("SELECT f FROM User u JOIN u.friends f WHERE u.id = :id")
    Page<User> getFriends(String id, Pageable pageable);

    @Query("SELECT f FROM User u JOIN u.friends f WHERE u.id = :id AND f.id = :id1")
    Optional<User> findFriend(String id, String id1);
}
