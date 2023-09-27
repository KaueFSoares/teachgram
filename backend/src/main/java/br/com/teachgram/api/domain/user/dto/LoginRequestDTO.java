package br.com.teachgram.api.domain.user.dto;

import jakarta.validation.constraints.NotEmpty;

public record LoginRequestDTO(
        @NotEmpty(message = "{validation.user.email.not-empty}")
        String email,
        @NotEmpty(message = "{validation.user.password.not-empty}")
        String password
) {
}
