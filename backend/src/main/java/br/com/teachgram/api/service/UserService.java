package br.com.teachgram.api.service;

import br.com.teachgram.api.domain.user.User;
import br.com.teachgram.api.domain.user.dto.DeleteResponseDTO;
import br.com.teachgram.api.domain.user.dto.UpdateRequestDTO;
import br.com.teachgram.api.domain.user.dto.UserDetailsDTO;
import br.com.teachgram.api.domain.user.validation.UserDataValidationService;
import br.com.teachgram.api.infra.exception.AuthException;
import br.com.teachgram.api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final UserDataValidationService userDataValidationService;

    @Autowired
    public UserService(
            UserRepository userRepository,
            UserDataValidationService userDataValidationService
    ) {
        this.userRepository = userRepository;
        this.userDataValidationService = userDataValidationService;
    }

    private User getAuthenticatedUser() {
        var auth = SecurityContextHolder.getContext().getAuthentication();

        return userRepository.findByEmail(auth.getName()).orElseThrow(() -> new AuthException("User not authorized."));
    }

    public UserDetailsDTO update(UpdateRequestDTO dto) {
        var user = getAuthenticatedUser();

        userDataValidationService.validate(dto);

        user.update(dto);

        return new UserDetailsDTO(user);
    }

    public DeleteResponseDTO delete() {
        var user = getAuthenticatedUser();

        user.setDeleted(true);

        return new DeleteResponseDTO("User deleted successfully.");
    }
}
