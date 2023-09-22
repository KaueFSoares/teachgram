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


            var seed = userRepository.save(makeUser("seed"));

            var friendOfSeed1 = userRepository.save(makeUser("friendOfSeed1"));
            var friendOfSeed2 = userRepository.save(makeUser("friendOfSeed2"));
            var friendOfSeed3 = userRepository.save(makeUser("friendOfSeed3"));

            seed.addFriend(friendOfSeed1);
            seed.addFriend(friendOfSeed2);
            seed.addFriend(friendOfSeed3);

            userRepository.save(seed);

            System.out.println("-----UserSeeder: users created-----");
        } else {
            System.out.println("-----UserSeeder: users already created-----");
        }
    }

    private User makeUser(String name) {
        var user = new User();

        user.setName(name);
        user.setEmail(name + "@" + name);
        user.setPhone(name);
        user.setBio(name);
        user.setPassword(passwordEncoder.encode(name));

        return user;
    }

}
