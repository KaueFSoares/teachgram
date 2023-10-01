package br.com.teachgram.api.domain.user.dto;

import br.com.teachgram.api.infra.constant.MESSAGE;
import jakarta.validation.constraints.NotEmpty;

public record LoginRequestDTO(
        @NotEmpty(message = MESSAGE.EMAIL_NOT_EMPTY)
        String email,
        @NotEmpty(message = MESSAGE.PASSWORD_NOT_EMPTY)
        String password
) {
}
