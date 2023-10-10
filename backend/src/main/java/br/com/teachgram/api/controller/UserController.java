package br.com.teachgram.api.controller;

import br.com.teachgram.api.infra.constant.ROUTE;
import br.com.teachgram.api.domain.user.dto.*;
import br.com.teachgram.api.service.UserService;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PutMapping
    @Transactional
    public ResponseEntity<UserDetailsDTO> update(@RequestBody @Valid UpdateRequestDTO dto) {
        return ResponseEntity.ok(userService.update(dto));
    }

    @DeleteMapping
    @Transactional
    public ResponseEntity<DeleteResponseDTO> delete() {
        return ResponseEntity.ok().body(userService.delete());
    }

    @GetMapping()
    public ResponseEntity<UserDetailsDTO> details() {
        return ResponseEntity.ok().body(userService.details());
    }

    @PostMapping(ROUTE.FRIENDS + "/{id}")
    @Transactional
    public ResponseEntity<FriendDetailsDTO> addFriend(@PathVariable String id) {
        return ResponseEntity.ok().body(userService.addFriend(id));
    }

    @GetMapping(ROUTE.FRIENDS)
    public ResponseEntity<Page<FriendShortDetailsDTO>> getFriends(Pageable pageable) {
        return ResponseEntity.ok().body(userService.getManyFriends(pageable));
    }

    @GetMapping(ROUTE.FRIENDS + "/{username}")
    public ResponseEntity<FriendDetailsDTO> getFriend(@PathVariable String username) {
        return ResponseEntity.ok().body(userService.getSingleFriend(username));
    }

    @DeleteMapping(ROUTE.FRIENDS + "/{id}")
    @Transactional
    public ResponseEntity<DeleteResponseDTO> deleteFriend(@PathVariable String id) {
        return ResponseEntity.ok().body(userService.deleteFriend(id));
    }

    @GetMapping(ROUTE.ANY + "/{username}")
    public ResponseEntity<UserProfileDTO> getAnyUser(@PathVariable String username) {
        return ResponseEntity.ok().body(userService.getAnyUser(username));
    }

}
