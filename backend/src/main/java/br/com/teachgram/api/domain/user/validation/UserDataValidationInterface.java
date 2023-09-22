package br.com.teachgram.api.domain.user.validation;

import br.com.teachgram.api.domain.user.dto.SignupRequestDTO;

public interface UserDataValidationInterface {
    void validate(SignupRequestDTO data);
}
