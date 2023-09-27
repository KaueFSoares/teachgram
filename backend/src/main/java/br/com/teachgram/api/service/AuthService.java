package br.com.teachgram.api.service;

import br.com.teachgram.api.domain.user.User;
import br.com.teachgram.api.domain.user.dto.*;
import br.com.teachgram.api.domain.user.validation.UserDataValidationService;
import br.com.teachgram.api.infra.exception.AuthException;
import br.com.teachgram.api.infra.exception.DeletedAccountException;
import br.com.teachgram.api.infra.exception.NotFoundException;
import br.com.teachgram.api.infra.i18n.CustomLocaleResolver;
import br.com.teachgram.api.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.ResponseEntity;
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
    private final MessageSource messageSource;
    private final CustomLocaleResolver customLocaleResolver;

    @Autowired
    public AuthService(
            UserRepository userRepository,
            UserDataValidationService userDataValidationService,
            PasswordEncoder passwordEncoder,
            AuthenticationManager authenticationManager,
            TokenService tokenService,
            MessageSource messageSource,
            CustomLocaleResolver customLocaleResolver
    ) {
        this.userRepository = userRepository;
        this.userDataValidationService = userDataValidationService;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.tokenService = tokenService;
        this.messageSource = messageSource;
        this.customLocaleResolver = customLocaleResolver;
    }

    public LoginResponseDTO login(LoginRequestDTO dto, HttpServletRequest request) {
        var user = userRepository.findByEmail(dto.email()).orElseThrow(() -> new NotFoundException(messageSource.getMessage("user", null, customLocaleResolver.resolveLocale(request))));

        if (user.getDeleted()) throw new DeletedAccountException("Deleted account.");

        var token = new UsernamePasswordAuthenticationToken(dto.email(), dto.password());

        authenticationManager.authenticate(token);

        return tokenService.generateToken(user.getId());
    }

    public LoginResponseDTO refreshToken(RefreshTokenRequestDTO dto) {
        var token = dto.refresh_token().replace("Bearer ", "");

        var subject = tokenService.validateToken(token);

        if (userRepository.findById(subject).orElseThrow(() -> new AuthException("User not found.")).getDeleted()) throw new DeletedAccountException("Deleted account.");

        return tokenService.generateToken(subject);
    }


    public LoginResponseDTO signup(SignupRequestDTO dto) {
        userDataValidationService.validate(dto);

        var user = new User(dto);

        user.setPassword(passwordEncoder.encode(dto.password()));

        return tokenService.generateToken(userRepository.save(user).getId());
    }
}
