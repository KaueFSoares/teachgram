package br.com.teachgram.api.domain.user.dto;

import br.com.teachgram.api.domain.post.Post;
import br.com.teachgram.api.domain.user.User;

import java.util.Set;

public record FriendDetailsDTO(
        String id,
        String name,
        String email,
        String username,
        String bio,
        String photo,
        Long friendsCount
) {
    public FriendDetailsDTO(User user, Long friendsCount) {
        this(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getActualUsername(),
                user.getBio(),
                user.getPhoto(),
                friendsCount
        );
    }
}
