package br.com.teachgram.api.domain.user.dto;

import br.com.teachgram.api.constant.MESSAGE;
import jakarta.validation.constraints.NotEmpty;

public record RefreshTokenRequestDTO(
        @NotEmpty(message = MESSAGE.REFRESH_TOKEN_NOT_EMPTY)
        String refresh_token
) {
}
