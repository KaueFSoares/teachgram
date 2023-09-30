package br.com.teachgram.api.domain.user.validation;

import br.com.teachgram.api.domain.user.dto.SignupRequestDTO;
import br.com.teachgram.api.domain.user.dto.UpdateRequestDTO;
import br.com.teachgram.api.infra.exception.DuplicateException;
import br.com.teachgram.api.repository.UserRepository;
import br.com.teachgram.api.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UserUsernameValidation implements UserDataValidationInterface{

    private final UserRepository userRepository;
    private final MessageService messageService;

    @Autowired
    public UserUsernameValidation(
            UserRepository userRepository,
            MessageService messageService
    ) {
        this.userRepository = userRepository;
        this.messageService = messageService;
    }

    @Override
    public void validate(SignupRequestDTO data) {
        if (data.username() != null && userRepository.existsByUsername(data.username())) throw new DuplicateException(messageService.getMessage("validation.user.username.duplicated"));
    }

    @Override
    public void validate(UpdateRequestDTO data) {
        if (data.username() != null && userRepository.existsByUsernameAndIdNot(data.username(), data.id())) throw new DuplicateException(messageService.getMessage("validation.user.username.duplicated"));
    }
}
