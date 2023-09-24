package br.com.teachgram.api.domain.post.dto;

import jakarta.validation.constraints.NotEmpty;

public record CreatePostRequestDTO(
        @NotEmpty
        String title,
        @NotEmpty
        String description,
        String photoLink,
        String videoLink
) {
}
