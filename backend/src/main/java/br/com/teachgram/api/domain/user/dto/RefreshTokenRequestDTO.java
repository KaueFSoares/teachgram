package br.com.teachgram.api.domain.user.dto;

import jakarta.validation.constraints.NotEmpty;

public record RefreshTokenRequestDTO(
        @NotEmpty(message = "{validation.user.refresh-token.not-empty}")
        String refresh_token
) {
}
