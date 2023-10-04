package br.com.teachgram.api.service;

import br.com.teachgram.api.infra.constant.MESSAGE;
import br.com.teachgram.api.infra.constant.VAR;
import br.com.teachgram.api.domain.user.User;
import br.com.teachgram.api.domain.user.dto.LoginRequestDTO;
import br.com.teachgram.api.domain.user.dto.LoginResponseDTO;
import br.com.teachgram.api.domain.user.dto.RefreshTokenRequestDTO;
import br.com.teachgram.api.domain.user.dto.SignupRequestDTO;
import br.com.teachgram.api.domain.user.validation.UserDataValidationService;
import br.com.teachgram.api.infra.exception.AuthException;
import br.com.teachgram.api.infra.exception.DeletedAccountException;
import br.com.teachgram.api.infra.exception.NotFoundException;
import br.com.teachgram.api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final UserDataValidationService userDataValidationService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final TokenService tokenService;
    private final MessageService messageService;

    @Autowired
    public AuthService(
            UserRepository userRepository,
            UserDataValidationService userDataValidationService,
            PasswordEncoder passwordEncoder,
            AuthenticationManager authenticationManager,
            TokenService tokenService,
            MessageService messageService
    ) {
        this.userRepository = userRepository;
        this.userDataValidationService = userDataValidationService;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.tokenService = tokenService;
        this.messageService = messageService;
    }

    public LoginResponseDTO login(LoginRequestDTO dto) {
        var user = userRepository.findByEmail(dto.email()).orElseThrow(() -> new NotFoundException(messageService.getMessage(MESSAGE.USER_NOT_FOUND)));

        if (user.getDeleted()) throw new DeletedAccountException(messageService.getMessage(MESSAGE.USER_DELETED));

        var token = new UsernamePasswordAuthenticationToken(dto.email(), dto.password());

        authenticationManager.authenticate(token);

        return tokenService.generateToken(user.getId());
    }

    public LoginResponseDTO refreshToken(RefreshTokenRequestDTO dto) {
        var token = dto.refresh_token().replace(VAR.TOKEN_TYPE + " ", "");

        var subject = tokenService.validateToken(token);

        if (userRepository.findById(subject).orElseThrow(() -> new AuthException(messageService.getMessage(MESSAGE.USER_NOT_FOUND))).getDeleted()) throw new DeletedAccountException(messageService.getMessage(MESSAGE.DELETED_USER));

        return tokenService.generateToken(subject);
    }


    public LoginResponseDTO signup(SignupRequestDTO dto) {
        userDataValidationService.validate(dto);

        var user = new User(dto);

        user.setPassword(passwordEncoder.encode(dto.password()));

        return tokenService.generateToken(userRepository.save(user).getId());
    }
}
