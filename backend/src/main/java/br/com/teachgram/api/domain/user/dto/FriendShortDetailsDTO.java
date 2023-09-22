package br.com.teachgram.api.domain.user.dto;

import br.com.teachgram.api.domain.user.User;

public record FriendShortDetailsDTO(
        String id,
        String name,
        String email,
        String photo
) {
    public FriendShortDetailsDTO(User user) {
        this(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getPhoto()
        );
    }
}
