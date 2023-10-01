package br.com.teachgram.api.domain.user.dto;

import br.com.teachgram.api.infra.constant.MESSAGE;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;

public record SignupRequestDTO(
        @NotEmpty(message = MESSAGE.NAME_NOT_EMPTY)
        String name,
        @NotEmpty(message = MESSAGE.EMAIL_NOT_EMPTY)
        @Email(message = MESSAGE.EMAIL_INVALID)
        String email,
        @NotEmpty(message = MESSAGE.USERNAME_NOT_EMPTY)
        String username,
        @NotEmpty(message = MESSAGE.PASSWORD_NOT_EMPTY)
        String password,
        @NotEmpty(message = MESSAGE.BIO_NOT_EMPTY)
        String bio,
        String phone,
        String photo
) {
}
