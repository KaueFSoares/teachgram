package br.com.teachgram.api.domain.user.dto;

import jakarta.validation.constraints.NotEmpty;

public record LoginRequestDTO(
        @NotEmpty(message = "{test}")
        String email,
        @NotEmpty(message = "Password is required.")
        String password
) {
}
