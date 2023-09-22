package br.com.teachgram.api.domain.user.validation;

import br.com.teachgram.api.domain.user.dto.SignupRequestDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserDataValidationService {

    private List<UserDataValidationInterface> validations;

    @Autowired
    public UserDataValidationService(List<UserDataValidationInterface> validations) {
        this.validations = validations;
    }

    public void validate(SignupRequestDTO data) {
        validations.forEach(validation -> validation.validate(data));
    }
}
