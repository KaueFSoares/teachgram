package br.com.teachgram.api.domain.post.dto;

import br.com.teachgram.api.constant.MESSAGE;
import jakarta.validation.constraints.NotEmpty;

public record CreatePostRequestDTO(
        @NotEmpty(message = MESSAGE.TITLE_NOT_EMPTY)
        String title,
        @NotEmpty(message = MESSAGE.DESCRIPTION_NOT_EMPTY)
        String description,
        String photoLink,
        String videoLink
) {
}
