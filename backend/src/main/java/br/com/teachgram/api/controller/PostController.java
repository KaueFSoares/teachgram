package br.com.teachgram.api.controller;

import br.com.teachgram.api.domain.post.dto.CreatePostRequestDTO;
import br.com.teachgram.api.domain.post.dto.DeletePostResponseDTO;
import br.com.teachgram.api.domain.post.dto.PostDetailsDTO;
import br.com.teachgram.api.service.PostService;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
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
    public ResponseEntity<PostDetailsDTO> createPost(@RequestBody @Valid CreatePostRequestDTO dto, UriComponentsBuilder uriComponentsBuilder) {
        var data = postService.createPost(dto);

        var uri = uriComponentsBuilder.path("/post/{id}").buildAndExpand(data.id()).toUri();

        return ResponseEntity.created(uri).body(data);
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<DeletePostResponseDTO> deletePost(@PathVariable String id) {
        return ResponseEntity.ok().body(postService.deletePost(id));
    }

}
