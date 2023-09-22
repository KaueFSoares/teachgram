package br.com.teachgram.api.domain.user.validation;

import br.com.teachgram.api.domain.user.dto.SignupRequestDTO;
import br.com.teachgram.api.domain.user.dto.UpdateRequestDTO;

public interface UserDataValidationInterface {
    void validate(SignupRequestDTO data);

    void validate(UpdateRequestDTO data);
}
