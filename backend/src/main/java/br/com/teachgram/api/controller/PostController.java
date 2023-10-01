package br.com.teachgram.api.controller;

import br.com.teachgram.api.infra.constant.ROUTE;
import br.com.teachgram.api.domain.post.dto.*;
import br.com.teachgram.api.service.PostService;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

@RestController
@RequestMapping(ROUTE.POSTS)
public class PostController {

    private final PostService postService;

    @Autowired
    public PostController(PostService postService) {
        this.postService = postService;
    }

    @PostMapping
    @Transactional
    public ResponseEntity<UserPostDetailsDTO> createPost(@RequestBody @Valid CreatePostRequestDTO dto, UriComponentsBuilder uriComponentsBuilder) {
        var data = postService.createPost(dto);

        var uri = uriComponentsBuilder.path(ROUTE.POSTS + "/{id}").buildAndExpand(data.id()).toUri();

        return ResponseEntity.created(uri).body(data);
    }

    @PutMapping("/{id}")
    @Transactional
    public ResponseEntity<UserPostDetailsDTO> updatePost(@PathVariable String id, @RequestBody @Valid UpdatePostRequestDTO dto) {
        return ResponseEntity.ok().body(postService.updatePost(id, dto));
    }

    @PutMapping("/{id}" + ROUTE.PRIVATE)
    @Transactional
    public ResponseEntity<UserPostDetailsDTO> updatePostPrivate(@PathVariable String id) {
        return ResponseEntity.ok().body(postService.updatePostPrivate(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<DeletePostResponseDTO> deletePost(@PathVariable String id) {
        return ResponseEntity.ok().body(postService.deletePost(id));
    }

    @GetMapping(ROUTE.ME + "/{id}")
    public ResponseEntity<UserPostDetailsDTO> getUserPost(@PathVariable String id) {
        return ResponseEntity.ok().body(postService.getUserPost(id));
    }

    @GetMapping(ROUTE.ME)
    public ResponseEntity<Page<ShortUserPostDetailsDTO>> getUserPosts(Pageable pageable) {
        return ResponseEntity.ok().body(postService.getUserPosts(pageable));
    }

    @GetMapping
    public ResponseEntity<Page<PostDetailsDTO>> getAllPosts(Pageable pageable) {
        return ResponseEntity.ok().body(postService.getAllPosts(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<PostDetailsDTO> getPostDetails(@PathVariable String id) {
        return ResponseEntity.ok().body(postService.getPostDetails(id));
    }

    @PutMapping("/{id}" + ROUTE.LIKE)
    @Transactional
    public ResponseEntity<UserPostDetailsDTO> likePost(@PathVariable String id) {
        return ResponseEntity.ok().body(postService.likePost(id));
    }

    @PutMapping("/{id}" + ROUTE.DISLIKE)
    @Transactional
    public ResponseEntity<UserPostDetailsDTO> dislikePost(@PathVariable String id) {
        return ResponseEntity.ok().body(postService.dislikePost(id));
    }

}
