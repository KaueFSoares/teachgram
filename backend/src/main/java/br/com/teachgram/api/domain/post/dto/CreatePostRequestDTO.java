package br.com.teachgram.api.domain.post.dto;

import br.com.teachgram.api.infra.constant.MESSAGE;
import jakarta.validation.constraints.NotEmpty;

public record CreatePostRequestDTO(
        String title,
        @NotEmpty(message = MESSAGE.DESCRIPTION_NOT_EMPTY)
        String description,
        @NotEmpty(message = MESSAGE.PHOTO_NOT_EMPTY)
        String photoLink,
        String videoLink
) {
}
