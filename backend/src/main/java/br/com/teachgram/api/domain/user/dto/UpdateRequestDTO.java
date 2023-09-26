package br.com.teachgram.api.domain.user.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;

public record UpdateRequestDTO(
        String id,
        String name,
        @Email
        String email,
        String password,
        String bio,
        String phone,
        String photo
) {
        public UpdateRequestDTO withId(String id) {
                return new UpdateRequestDTO(id, name, email, password, bio, phone, photo);
        }

}
