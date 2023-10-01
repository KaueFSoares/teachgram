package br.com.teachgram.api.domain.user;

import br.com.teachgram.api.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Random;

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
            userRepository.save(makeUser("seed", "seed@seed.seed", "@seed", "seed", "seed", "seed", "seed"));


            var user1 = userRepository.save(makeUser(
                    "Pedro",
                    "pedro@pedro.pedro",
                    "@pedro",
                    "(51) 123456789",
                    "Hello, I'm Pedro",
                    "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    "pedro"
            ));

            var user2 = userRepository.save(makeUser(
                    "Manuela",
                    "manuela@manuela.manuela",
                    "@manuela",
                    "(51) 123456789",
                    "Hello, I'm Manuela",
                    "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    "manuela"
            ));

            var user3 = userRepository.save(makeUser(
                    "Cleomar",
                    "cleomar@cleomar.cleomar",
                    "@cleomar",
                    "(51) 123456789",
                    "Hello, I'm Cleomar",
                    "https://images.pexels.com/photos/3170635/pexels-photo-3170635.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    "cleomar"
            ));

            var user4 = userRepository.save(makeUser(
                    "Gisele",
                    "gisele@gisele.gisele",
                    "@gisele",
                    "(51) 123456789",
                    "Hello, I'm Gisele",
                    "https://images.pexels.com/photos/18398531/pexels-photo-18398531/free-photo-of-loira-decorado-noite-iluminado.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    "gisele"
            ));

            var user5 = userRepository.save(makeUser(
                    "Vinicius",
                    "vinicius@vinicius.vinicius",
                    "@vinicius",
                    "(51) 123456789",
                    "Hello, I'm Vinicius",
                    "https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    "vinicius"
            ));

            var user6 = userRepository.save(makeUser(
                    "Luiza",
                    "luiza@luiza.luiza",
                    "@luiza",
                    "(51) 123456789",
                    "Hello, I'm Luiza",
                    "https://images.pexels.com/photos/18399183/pexels-photo-18399183/free-photo-of-moda-tendencia-chapeu-desviando-o-olhar.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    "luiza"
            ));

            var user7 = userRepository.save(makeUser(
                    "Vitor",
                    "vitor@vitor.vitor",
                    "@vitor",
                    "(51) 123456789",
                    "Hello, I'm Vitor",
                    "https://images.pexels.com/photos/943235/pexels-photo-943235.jpeg?auto=compress&cs=tinysrgb&w=600",
                    "vitor"
            ));

            var user8 = userRepository.save(makeUser(
                    "Amanda",
                    "amanda@amanda.amanda",
                    "@amanda",
                    "(51) 123456789",
                    "Hello, I'm Amanda",
                    "https://images.pexels.com/photos/18399187/pexels-photo-18399187/free-photo-of-morena-moda-tendencia-modelo.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    "amanda"
            ));

            var user9 = userRepository.save(makeUser(
                    "Rafael",
                    "rafael@rafael.rafael",
                    "@rafael",
                    "(51) 123456789",
                    "Hello, I'm Rafael",
                    "https://images.pexels.com/photos/4890259/pexels-photo-4890259.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    "rafael"
            ));

            var user10 = userRepository.save(makeUser(
                    "Gustavo",
                    "gustavo@gustavo.gustavo",
                    "@gustavo",
                    "(51) 123456789",
                    "Hello, I'm Gustavo",
                    "https://images.pexels.com/photos/9789893/pexels-photo-9789893.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    "gustavo"
            ));

            var user11 = userRepository.save(makeUser(
                    "Emily",
                    "emily@emily.emily",
                    "@emily",
                    "(51) 123456789",
                    "Hello, I'm Emily",
                    "https://images.pexels.com/photos/18398354/pexels-photo-18398354/free-photo-of-garota-de-tiro-individual.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    "emily"
            ));

            var user12 = userRepository.save(makeUser(
                    "Vitoria",
                    "vitoria@vitoria.vitoria",
                    "@vitoria",
                    "(51) 123456789",
                    "Hello, I'm Vitoria",
                    "https://images.pexels.com/photos/18402281/pexels-photo-18402281/free-photo-of-cultura-face-rosto-cara.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    "vitoria"
            ));

            var user13 = userRepository.save(makeUser(
                    "Thais",
                    "thais@thais.thais",
                    "@thais",
                    "(51) 123456789",
                    "Hello, I'm Thais",
                    "https://images.pexels.com/photos/18460522/pexels-photo-18460522/free-photo-of-face-rosto-cara-touca.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    "thais"
            ));

            var user14 = userRepository.save(makeUser(
                    "Diego",
                    "diego@diego.diego",
                    "@diego",
                    "(51) 123456789",
                    "Hello, I'm Diego",
                    "https://images.pexels.com/photos/10049576/pexels-photo-10049576.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    "diego"
            ));


            var user15 = userRepository.save(makeUser(
                    "Julia da Silva",
                    "julia@julia.julia",
                    "@julia",
                    "(51) 123456789",
                    "Oi, eu sou Júlia",
                    "https://images.pexels.com/photos/18362110/pexels-photo-18362110/free-photo-of-preto-e-branco-p-b-jaqueta-casaco.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    "julia"
            ));

            var user16 = userRepository.save(makeUser(
                    "Matheus da Silva",
                    "matheus@matheus.matheus",
                    "@matheus",
                    "(51) 123456789",
                    "Oi, eu sou Matheus",
                    "https://images.pexels.com/photos/5220075/pexels-photo-5220075.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    "matheus"
            ));

            var user17 = userRepository.save(makeUser(
                    "Maria da Silva",
                    "maria@maria.maria",
                    "@maria",
                    "(51) 123456789",
                    "Oi, eu sou Maria",
                    "https://images.pexels.com/photos/18344916/pexels-photo-18344916/free-photo-of-tiro-individual.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    "maria"
            ));

            var user18 = userRepository.save(makeUser(
                    "João da Silva",
                    "joao@joao.joao",
                    "@joao",
                    "(51) 123456789",
                    "Oi, eu sou João",
                    "https://images.pexels.com/photos/6781228/pexels-photo-6781228.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    "joao"
            ));

            var user19 = userRepository.save(makeUser(
                    "Nicolas",
                    "nicolas@nicolas.nicolas",
                    "@nicolas",
                    "(51) 123456789",
                    "Hello, I'm Nicolas",
                    "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    "nicolas"
            ));

            var user20 = userRepository.save(makeUser(
                    "Leticia",
                    "leticia@leticia.leticia",
                    "@leticia",
                    "(51) 123456789",
                    "Hello, I'm Leticia",
                    "https://images.pexels.com/photos/18417174/pexels-photo-18417174/free-photo-of-vestido-maternidade-lado-de-fora-exterior.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    "leticia"
            ));

            var user21 = userRepository.save(makeUser(
                    "Lucas",
                    "lucas@lucas.lucas",
                    "@lucas",
                    "(51) 123456789",
                    "Hello, I'm Lucas",
                    "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    "lucas"
            ));

            var user22 = userRepository.save(makeUser(
                    "Sabrina",
                    "sabrina@sabrina.sabrina",
                    "@sabrina",
                    "(51) 123456789",
                    "Hello, I'm Sabrina",
                    "https://images.pexels.com/photos/18405663/pexels-photo-18405663/free-photo-of-lado-de-fora-exterior-posando-bonita.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    "sabrina"
            ));

            var user23 = userRepository.save(makeUser(
                    "Leonardo",
                    "leonardo@leonardo.leonardo",
                    "@leonardo",
                    "(51) 123456789",
                    "Hello, I'm Leonardo",
                    "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    "leonardo"
            ));

            var user24 = userRepository.save(makeUser(
                    "Angelica",
                    "angelica@angelica.angelica",
                    "@angelica",
                    "(51) 123456789",
                    "Hello, I'm Angelica",
                    "https://images.pexels.com/photos/18435667/pexels-photo-18435667/free-photo-of-lindo-bonito-atraente-elegante.jpeg?auto=compress&cs=tinysrgb&w=600",
                    "angelica"
            ));

            var user25 = userRepository.save(makeUser(
                    "Fernando",
                    "fernando@fernando.fernando",
                    "@fernando",
                    "(51) 123456789",
                    "Hello, I'm Fernando",
                    "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    "fernando"
            ));

            var user26 = userRepository.save(makeUser(
                    "Fernanda",
                    "fernanda@fernanda.fernanda",
                    "@fernanda",
                    "(51) 123456789",
                    "Hello, I'm Fernanda",
                    "https://images.pexels.com/photos/18387677/pexels-photo-18387677/free-photo-of-b-w.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    "fernanda"
            ));

            var user27 = userRepository.save(makeUser(
                    "Tiago",
                    "tiago@tiago.tiago",
                    "@tiago",
                    "(51) 123456789",
                    "Hello, I'm Tiago",
                    "https://images.pexels.com/photos/93827/pexels-photo-93827.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    "tiago"
            ));

            var user28 = userRepository.save(makeUser(
                    "Isadora",
                    "isadora@isadora.isadora",
                    "@isadora",
                    "(51) 123456789",
                    "Hello, I'm Isadora",
                    "https://images.pexels.com/photos/18405164/pexels-photo-18405164/free-photo-of-esta-chovendo-mal-humorado.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    "isadora"
            ));

            var users = new ArrayList<User>();

            users.add(user3);
            users.add(user4);
            users.add(user5);
            users.add(user6);
            users.add(user7);
            users.add(user8);
            users.add(user9);
            users.add(user10);
            users.add(user11);
            users.add(user12);
            users.add(user13);
            users.add(user14);
            users.add(user15);
            users.add(user16);
            users.add(user17);
            users.add(user18);
            users.add(user19);
            users.add(user20);
            users.add(user21);
            users.add(user22);
            users.add(user23);
            users.add(user24);
            users.add(user25);
            users.add(user26);
            users.add(user27);
            users.add(user28);

            // user 2 follows no users
            // user 1 follows all users
            for (User user : users) {
                user1.addFriend(user);
                userRepository.save(user1);
            }

            for (User user : users) {
                user1.addFriend(user);
                userRepository.save(user1);
            }

            // changes the order of the list
            Collections.shuffle(users);

            // add 11 random friends to each user
            for (User user : users) {
                for (int i = 0; i < 11; i++) {
                    User randomFriend = getRandomFriend(users, user);

                    randomFriend.addFriend(user);
                    userRepository.save(randomFriend);
                }

                userRepository.save(user);
            }


            System.out.println("-----UserSeeder: users created-----");
        } else {
            System.out.println("-----UserSeeder: users already created-----");
        }
    }

    private User getRandomFriend(ArrayList<User> users, User currentUser) {
        User randomFriend;
        do {
            randomFriend = users.get(new Random().nextInt(users.size()));
        } while (randomFriend.equals(currentUser) || currentUser.getFriends().contains(randomFriend));
        return randomFriend;
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
