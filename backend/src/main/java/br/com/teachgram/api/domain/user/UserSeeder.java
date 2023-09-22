package br.com.teachgram.api.domain.user;

import br.com.teachgram.api.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class UserSeeder {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserSeeder(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostConstruct
    public void seed() {
        if (userRepository.count() == 0) {
            var user = new User();

            user.setName("seed");
            user.setEmail("seed@seed");
            user.setPhone("seed");
            user.setBio("seed");
            user.setPassword(passwordEncoder.encode("seed"));

            userRepository.save(user);

            System.out.println("-----UserSeeder: users created-----");
        } else {
            System.out.println("-----UserSeeder: users already created-----");
        }
    }

}
