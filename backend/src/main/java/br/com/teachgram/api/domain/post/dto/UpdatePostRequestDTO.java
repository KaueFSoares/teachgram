package br.com.teachgram.api.domain.post.dto;

public record UpdatePostRequestDTO(
        String title,
        String description,
        String photoLink,
        String videoLink
) {
}
