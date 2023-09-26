package br.com.teachgram.api.domain.user.validation;

import br.com.teachgram.api.domain.user.dto.SignupRequestDTO;
import br.com.teachgram.api.domain.user.dto.UpdateRequestDTO;
import br.com.teachgram.api.infra.exception.DuplicateException;
import br.com.teachgram.api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UserPhoneValidation implements UserDataValidationInterface{

    private final UserRepository userRepository;

    @Autowired
    public UserPhoneValidation(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void validate(SignupRequestDTO data) {
        if (data.phone() != null && userRepository.existsByPhone(data.phone())) throw new DuplicateException("Phone already exists.");
    }

    @Override
    public void validate(UpdateRequestDTO data) {
        if (data.phone() != null && userRepository.existsByPhoneAndIdNot(data.phone(), data.id())) throw new DuplicateException("Phone already exists.");
    }
}
