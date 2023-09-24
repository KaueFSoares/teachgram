package br.com.teachgram.api.controller;

import br.com.teachgram.api.domain.post.dto.CreatePostRequestDTO;
import br.com.teachgram.api.domain.post.dto.DeletePostResponseDTO;
import br.com.teachgram.api.domain.post.dto.ShortUserPostDetailsDTO;
import br.com.teachgram.api.domain.post.dto.UserPostDetailsDTO;
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
@RequestMapping("/post")
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

        var uri = uriComponentsBuilder.path("/post/{id}").buildAndExpand(data.id()).toUri();

        return ResponseEntity.created(uri).body(data);
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<DeletePostResponseDTO> deletePost(@PathVariable String id) {
        return ResponseEntity.ok().body(postService.deletePost(id));
    }

    @GetMapping("/me/{id}")
    public ResponseEntity<UserPostDetailsDTO> getUserPost(@PathVariable String id) {
        return ResponseEntity.ok().body(postService.getUserPost(id));
    }

    @GetMapping("/me")
    public ResponseEntity<Page<ShortUserPostDetailsDTO>> getUserPosts(Pageable pageable) {
        return ResponseEntity.ok().body(postService.getUserPosts(pageable));
    }

}
