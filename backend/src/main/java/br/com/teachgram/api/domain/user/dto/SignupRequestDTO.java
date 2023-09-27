package br.com.teachgram.api.domain.user.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;

public record SignupRequestDTO(
        @NotEmpty(message = "{validation.user.name.not-empty}")
        String name,
        @NotEmpty(message = "{validation.user.email.not-empty}")
        @Email(message = "{validation.user.email.invalid}")
        String email,
        @NotEmpty(message = "{validation.user.password.not-empty}")
        String password,
        @NotEmpty(message = "{validation.user.bio.not-empty}")
        String bio,
        String phone,
        String photo
) {
}
