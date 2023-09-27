package br.com.teachgram.api.domain.post.dto;

import jakarta.validation.constraints.NotEmpty;

public record CreatePostRequestDTO(
        @NotEmpty(message = "{validation.post.title.not-empty}")
        String title,
        @NotEmpty(message = "{validation.post.description.not-empty}")
        String description,
        String photoLink,
        String videoLink
) {
}
