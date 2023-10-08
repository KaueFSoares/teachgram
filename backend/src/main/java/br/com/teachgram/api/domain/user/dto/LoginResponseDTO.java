package br.com.teachgram.api.domain.user.dto;

public record LoginResponseDTO(
        String token_type,
        String access_token,
        Long access_token_expires_at,
        String refresh_token,
        Long refresh_token_expires_at
) {
}