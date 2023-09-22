package br.com.teachgram.api.repository;

import br.com.teachgram.api.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String> {
    @Query("SELECT u FROM User u WHERE u.email = ?1")
    Optional<UserDetails> findDetailsByEmail(String email);

    Optional<User> findByEmail(String email);

    @Query("select new User(u.id, u.email, u.password) from User u where u.email = :email")
    UserDetails findTopByEmail(String email);

    Boolean existsByEmail(String email);

    Boolean existsByPhone(String phone);

}
