package br.com.teachgram.api.domain.user.validation;

import br.com.teachgram.api.constant.MESSAGE;
import br.com.teachgram.api.domain.user.dto.SignupRequestDTO;
import br.com.teachgram.api.domain.user.dto.UpdateRequestDTO;
import br.com.teachgram.api.infra.exception.DuplicateException;
import br.com.teachgram.api.repository.UserRepository;
import br.com.teachgram.api.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UserEmailValidation implements UserDataValidationInterface{

    private final UserRepository userRepository;
    private final MessageService messageService;

    @Autowired
    public UserEmailValidation(
            UserRepository userRepository,
            MessageService messageService
    ) {
        this.userRepository = userRepository;
        this.messageService = messageService;
    }

    @Override
    public void validate(SignupRequestDTO data) {
        if (userRepository.existsByEmail(data.email())) throw new DuplicateException(messageService.getMessage(MESSAGE.EMAIL_DUPLICATED));
    }

    @Override
    public void validate(UpdateRequestDTO data) {
        if (data.email() != null && userRepository.existsByEmailAndIdNot(data.email(), data.id())) throw new DuplicateException(messageService.getMessage(MESSAGE.EMAIL_DUPLICATED));
    }
}
