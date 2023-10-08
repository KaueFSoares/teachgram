package br.com.teachgram.api.domain.user.dto;

public record LoginResponseDTO(
        String token_type,
        String access_token,
        String refresh_token
) {
}