package br.com.teachgram.api.domain.user.dto;

import jakarta.validation.constraints.NotEmpty;

public record RefreshTokenRequestDTO(
        @NotEmpty(message = "Refresh token is required.")
        String refresh_token
) {
}
