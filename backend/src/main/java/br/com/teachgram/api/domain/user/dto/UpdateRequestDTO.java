package br.com.teachgram.api.domain.user.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;

public record UpdateRequestDTO(
        String id,
        String name,
        @Email(message = "{validation.user.email.invalid}")
        String email,
        String username,
        String password,
        String bio,
        String phone,
        String photo
) {
        public UpdateRequestDTO withId(String id) {
                return new UpdateRequestDTO(id, name, email, username, password, bio, phone, photo);
        }
}
