package br.com.teachgram.api.service;

import br.com.teachgram.api.domain.post.Post;
import br.com.teachgram.api.domain.post.dto.*;
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

    private Post getPost(String id) {
        var user = getAuthenticatedUser();

        var post = postRepository.findById(id).orElseThrow(() -> new NotFoundException("Post not found."));

        if (!post.getUser().equals(user)) {
            throw new AuthException("User not authorized.");
        }
        return post;
    }

    public UserPostDetailsDTO createPost(CreatePostRequestDTO dto) {
        var user = getAuthenticatedUser();

        var post = new Post(dto, user);

        return new UserPostDetailsDTO(postRepository.save(post));
    }

    public DeletePostResponseDTO deletePost(String id) {
        var post = getPost(id);

        post.setDeleted(true);

        return new DeletePostResponseDTO("Post deleted successfully.");
    }

    public UserPostDetailsDTO getUserPost(String id) {
        var post = getPost(id);

        return new UserPostDetailsDTO(post);
    }

    public Page<ShortUserPostDetailsDTO> getUserPosts(Pageable pageable) {
        var user = getAuthenticatedUser();

        return postRepository.findAllByUserAndDeletedFalse(user, pageable).map(ShortUserPostDetailsDTO::new);
    }

    public PostDetailsDTO getPostDetails(String id) {
        return new PostDetailsDTO(postRepository.findByIdAndDeletedFalse(id ));
    }

    public Page<PostDetailsDTO> getAllPosts(Pageable pageable) {
        var user = getAuthenticatedUser();

        return postRepository.getAllPostsByTimeDescWithoutOwnPosts(user.getId(), pageable).map(PostDetailsDTO::new);
    }

    public UserPostDetailsDTO updatePost(String id, UpdatePostRequestDTO dto) {
        var post = getPost(id);

        post.update(dto);

        return new UserPostDetailsDTO(postRepository.save(post));
    }

    public UserPostDetailsDTO updatePostPrivate(String id) {
        var post = getPost(id);

        post.setPrivatePost(!post.getPrivatePost());

        return new UserPostDetailsDTO(postRepository.save(post));
    }

    public UserPostDetailsDTO likePost(String id) {
        var post = getPost(id);

        post.setLikes(post.getLikes() + 1);

        return new UserPostDetailsDTO(postRepository.save(post));
    }

    public UserPostDetailsDTO dislikePost(String id) {
        var post = getPost(id);

        post.setLikes(post.getLikes() - 1);

        return new UserPostDetailsDTO(postRepository.save(post));
    }
}
