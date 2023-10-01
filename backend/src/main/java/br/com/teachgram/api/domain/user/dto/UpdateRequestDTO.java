package br.com.teachgram.api.domain.user.dto;

import br.com.teachgram.api.infra.constant.MESSAGE;
import jakarta.validation.constraints.Email;

public record UpdateRequestDTO(
        String id,
        String name,
        @Email(message = MESSAGE.EMAIL_INVALID)
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
