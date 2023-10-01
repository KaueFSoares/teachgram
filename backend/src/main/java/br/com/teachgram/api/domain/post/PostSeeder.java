package br.com.teachgram.api.domain.post;

import br.com.teachgram.api.domain.post.dto.CreatePostRequestDTO;
import br.com.teachgram.api.repository.PostRepository;
import br.com.teachgram.api.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.DependsOn;
import org.springframework.stereotype.Component;

@Component
@DependsOn("userSeeder")
public class PostSeeder {

    private final UserRepository userRepository;
    private final PostRepository postRepository;

    @Autowired
    public PostSeeder(UserRepository userRepository, PostRepository postRepository) {
        this.userRepository = userRepository;
        this.postRepository = postRepository;
    }

    @PostConstruct
    public void seed() {
        if (postRepository.count() == 0) {
            var julia = userRepository.findByEmail("julia@julia.julia").orElse(null);
            var matheus = userRepository.findByEmail("matheus@matheus.matheus").orElse(null);
            var maria = userRepository.findByEmail("maria@maria.maria").orElse(null);
            var joao = userRepository.findByEmail("joao@joao.joao").orElse(null);

            var post1 = new Post(
                    new CreatePostRequestDTO(
                            "Post da julia",
                            "Look at this beautiful view",
                            "https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                            ""
                    ),
                    julia
            );

            var post2 = new Post(
                    new CreatePostRequestDTO(
                            "Post do matheus",
                            "Look at this beautiful view",
                            "https://images.pexels.com/photos/1624438/pexels-photo-1624438.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                            ""
                    ),
                    matheus
            );

            var post3 = new Post(
                    new CreatePostRequestDTO(
                            "Post da maria",
                            "Look at this beautiful view",
                            "https://images.pexels.com/photos/325807/pexels-photo-325807.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                            ""
                    ),
                    maria
            );

            var post4 = new Post(
                    new CreatePostRequestDTO(
                            "Post do joao",
                            "Look at this beautiful view",
                            "https://images.pexels.com/photos/5968894/pexels-photo-5968894.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                            ""
                    ),
                    joao
            );

            var post5 = new Post(
                    new CreatePostRequestDTO(
                            "Post da julia",
                            "Look at this beautiful view",
                            "https://images.pexels.com/photos/551851/pexels-photo-551851.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                            ""
                    ),
                    julia
            );

            var post6 = new Post(
                    new CreatePostRequestDTO(
                            "Post do joao2",
                            "Look at this beautiful view",
                            "https://images.pexels.com/photos/5968894/pexels-photo-5968894.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                            ""
                    ),
                    joao
            );

            var post7 = new Post(
                    new CreatePostRequestDTO(
                            "Post do joao3",
                            "Look at this beautiful view",
                            "https://images.pexels.com/photos/5968894/pexels-photo-5968894.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                            ""
                    ),
                    joao
            );

            var post8 = new Post(
                    new CreatePostRequestDTO(
                            "Post do joao3",
                            "Look at this beautiful view",
                            "https://images.pexels.com/photos/5968894/pexels-photo-5968894.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                            ""
                    ),
                    joao
            );

            var post9 = new Post(
                    new CreatePostRequestDTO(
                            "Post do joao4",
                            "Look at this beautiful view",
                            "https://images.pexels.com/photos/5968894/pexels-photo-5968894.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                            ""
                    ),
                    joao
            );

            var post10 = new Post(
                    new CreatePostRequestDTO(
                            "Post do joao5",
                            "Look at this beautiful view",
                            "https://images.pexels.com/photos/5968894/pexels-photo-5968894.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                            ""
                    ),
                    joao
            );

            post1.setCreatedAt(post1.getCreatedAt().plusMinutes(1));
            post2.setCreatedAt(post2.getCreatedAt().plusMinutes(2));
            post3.setCreatedAt(post3.getCreatedAt().plusMinutes(3));
            post4.setCreatedAt(post4.getCreatedAt().plusMinutes(4));
            post5.setCreatedAt(post5.getCreatedAt().plusMinutes(5));
            post6.setCreatedAt(post6.getCreatedAt().plusMinutes(6));
            post7.setCreatedAt(post7.getCreatedAt().plusMinutes(7));
            post8.setCreatedAt(post8.getCreatedAt().plusMinutes(8));
            post9.setCreatedAt(post9.getCreatedAt().plusMinutes(9));
            post10.setCreatedAt(post10.getCreatedAt().plusMinutes(10));
            

            postRepository.save(post1);
            postRepository.save(post2);
            postRepository.save(post3);
            postRepository.save(post4);
            postRepository.save(post5);
            postRepository.save(post6);
            postRepository.save(post7);
            postRepository.save(post8);
            postRepository.save(post9);
            postRepository.save(post10);

            System.out.println("-----PostSeeder: posts created-----");
        } else {
            System.out.println("-----PostSeeder: posts already created-----");
        }
    }


}
