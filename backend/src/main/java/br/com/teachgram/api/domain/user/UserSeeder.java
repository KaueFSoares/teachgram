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
            userRepository.save(makeUser("seed", "seed@seed", "@seed", "seed", "seed", "seed", "seed"));

            var julia = userRepository.save(makeUser(
                    "Julia da Silva",
                    "julia@julia",
                    "@julia",
                    "(51) 123456789",
                    "Oi, eu sou Júlia",
                    "https://images.pexels.com/photos/18362110/pexels-photo-18362110/free-photo-of-preto-e-branco-p-b-jaqueta-casaco.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    "julia"
            ));

            var matheus = userRepository.save(makeUser(
                    "Matheus da Silva",
                    "matheus@matheus",
                    "@matheus",
                    "(51) 123456789",
                    "Oi, eu sou Matheus",
                    "https://images.pexels.com/photos/5220075/pexels-photo-5220075.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    "matheus"
            ));

            var maria = userRepository.save(makeUser(
                    "Maria da Silva",
                    "maria@maria",
                    "@maria",
                    "(51) 123456789",
                    "Oi, eu sou Maria",
                    "https://images.pexels.com/photos/18344916/pexels-photo-18344916/free-photo-of-tiro-individual.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    "maria"
            ));

            var joao = userRepository.save(makeUser(
                    "João da Silva",
                    "joao@joao",
                    "@joao",
                    "(51) 123456789",
                    "Oi, eu sou João",
                    "https://images.pexels.com/photos/6781228/pexels-photo-6781228.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    "joao"
            ));

            julia.addFriend(matheus);
            userRepository.save(julia);

            julia.addFriend(maria);
            userRepository.save(julia);

            matheus.addFriend(joao);
            userRepository.save(matheus);

            System.out.println("-----UserSeeder: users created-----");
        } else {
            System.out.println("-----UserSeeder: users already created-----");
        }
    }

    private User makeUser(
            String name,
            String email,
            String username,
            String phone,
            String bio,
            String photo,
            String password
    ) {
        var user = new User();

        user.setName(name);
        user.setEmail(email);
        user.setUsername(username);
        user.setPhone(phone);
        user.setBio(bio);
        user.setPhoto(photo);
        user.setPassword(passwordEncoder.encode(password));

        return user;
    }

}
