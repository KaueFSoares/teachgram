package br.com.teachgram.api.domain.user.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;

public record UpdateRequestDTO(
        String name,
        String email,
        String password,
        String bio,
        String phone,
        String photo
) {
}
