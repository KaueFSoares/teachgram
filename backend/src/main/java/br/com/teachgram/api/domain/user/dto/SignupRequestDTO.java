package br.com.teachgram.api.domain.user.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;

public record SignupRequestDTO(
        @NotEmpty(message = "Name is required.")
        String name,
        @NotEmpty(message = "Email is required.")
        @Email(message = "Email must be valid.")
        String email,
        @NotEmpty(message = "Password is required.")
        String password,
        @NotEmpty(message = "Bio is required.")
        String bio,
        String phone,
        String photo
) {
}
