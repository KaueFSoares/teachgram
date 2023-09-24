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
            var julia = userRepository.findByEmail("julia@julia").orElse(null);
            var matheus = userRepository.findByEmail("matheus@matheus").orElse(null);
            var maria = userRepository.findByEmail("maria@maria").orElse(null);
            var joao = userRepository.findByEmail("joao@joao").orElse(null);

            var post1 = new Post(
                    new CreatePostRequestDTO(
                            "Post da julia",
                            "https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                            "Look at this beautiful view",
                            ""
                    ),
                    julia
            );

            var post2 = new Post(
                    new CreatePostRequestDTO(
                            "Post do matheus",
                            "https://images.pexels.com/photos/1624438/pexels-photo-1624438.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                            "Look at this beautiful view",
                            ""
                    ),
                    matheus
            );

            var post3 = new Post(
                    new CreatePostRequestDTO(
                            "Post da maria",
                            "https://images.pexels.com/photos/325807/pexels-photo-325807.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                            "Look at this beautiful view",
                            ""
                    ),
                    maria
            );

            var post4 = new Post(
                    new CreatePostRequestDTO(
                            "Post do joao",
                            "https://images.pexels.com/photos/5968894/pexels-photo-5968894.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                            "Look at this beautiful view",
                            ""
                    ),
                    joao
            );

            var post5 = new Post(
                    new CreatePostRequestDTO(
                            "Post da julia",
                            "https://images.pexels.com/photos/551851/pexels-photo-551851.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                            "Look at this beautiful view",
                            ""
                    ),
                    julia
            );

            postRepository.save(post1);
            postRepository.save(post2);
            postRepository.save(post3);
            postRepository.save(post4);
            postRepository.save(post5);

            System.out.println("-----PostSeeder: posts created-----");
        } else {
            System.out.println("-----PostSeeder: posts already created-----");
        }
    }


}
