package br.com.teachgram.api.domain.user.dto;

import br.com.teachgram.api.domain.user.User;

import java.time.LocalDateTime;

public record UserDetailsDTO(
        String id,
        Boolean deleted,
        LocalDateTime createdAt,
        LocalDateTime updatedAt,
        String name,
        String email,
        String username,
        String phone,
        String bio,
        String photo,
        Long friendsCount,
        Long postsCount
) {
    public UserDetailsDTO(User user, Long friendsCount, Long postsCount) {
        this(
                user.getId(),
                user.getDeleted(),
                user.getCreatedAt(),
                user.getUpdatedAt(),
                user.getName(),
                user.getEmail(),
                user.getUsername(),
                user.getPhone(),
                user.getBio(),
                user.getPhoto(),
                friendsCount,
                postsCount
        );
    }
}
