package br.com.teachgram.api.service;

import br.com.teachgram.api.domain.post.Post;
import br.com.teachgram.api.domain.post.dto.CreatePostRequestDTO;
import br.com.teachgram.api.domain.post.dto.DeletePostResponseDTO;
import br.com.teachgram.api.domain.post.dto.ShortUserPostDetailsDTO;
import br.com.teachgram.api.domain.post.dto.UserPostDetailsDTO;
import br.com.teachgram.api.domain.user.User;
import br.com.teachgram.api.infra.exception.AuthException;
import br.com.teachgram.api.infra.exception.NotFoundException;
import br.com.teachgram.api.repository.PostRepository;
import br.com.teachgram.api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class PostService {

    private final UserRepository userRepository;
    private final PostRepository postRepository;

    @Autowired
    public PostService(UserRepository userRepository, PostRepository postRepository) {
        this.userRepository = userRepository;
        this.postRepository = postRepository;
    }

    private User getAuthenticatedUser() {
        var auth = SecurityContextHolder.getContext().getAuthentication();

        return userRepository.findByEmail(auth.getName()).orElseThrow(() -> new AuthException("User not authorized."));
    }
    public UserPostDetailsDTO createPost(CreatePostRequestDTO dto) {
        var user = getAuthenticatedUser();

        var post = new Post(dto, user);

        return new UserPostDetailsDTO(postRepository.save(post));
    }

    public DeletePostResponseDTO deletePost(String id) {
        var user = getAuthenticatedUser();

        var post = postRepository.findById(id).orElseThrow(() -> new NotFoundException("Post not found."));

        if (!post.getUser().equals(user)) {
            throw new AuthException("User not authorized.");
        }

        post.setDeleted(true);

        return new DeletePostResponseDTO("Post deleted successfully.");
    }

    public UserPostDetailsDTO getUserPost(String id) {
        var post = postRepository.findById(id).orElseThrow(() -> new NotFoundException("Post not found."));

        var user = getAuthenticatedUser();

        if (!post.getUser().equals(user)) {
            throw new AuthException("User not authorized.");
        }

        return new UserPostDetailsDTO(post);
    }

    public Page<ShortUserPostDetailsDTO> getUserPosts(Pageable pageable) {
        var user = getAuthenticatedUser();

        return postRepository.findAllByUserAndDeletedFalse(user, pageable).map(ShortUserPostDetailsDTO::new);
    }
}
