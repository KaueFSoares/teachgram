package br.com.teachgram.api.controller;

import br.com.teachgram.api.domain.user.User;
import br.com.teachgram.api.domain.user.dto.*;
import br.com.teachgram.api.domain.user.validation.UserDataValidationService;
import br.com.teachgram.api.infra.exception.DeletedAccountException;
import br.com.teachgram.api.infra.exception.NotFoundException;
import br.com.teachgram.api.repository.UserRepository;
import br.com.teachgram.api.service.AuthService;
import br.com.teachgram.api.service.TokenService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody @Valid LoginRequestDTO dto) {
        return ResponseEntity.ok(authService.login(dto));
    }

    @PostMapping("/refresh")
    public ResponseEntity<LoginResponseDTO> refreshToken(@RequestBody @Valid RefreshTokenRequestDTO dto) {
        return ResponseEntity.ok(authService.refreshToken(dto));
    }

    @Transactional
    @PostMapping("/signup")
    public ResponseEntity<LoginResponseDTO> signup(@RequestBody @Valid SignupRequestDTO dto, UriComponentsBuilder uriComponentsBuilder) {
        var uri = uriComponentsBuilder.path("/user").buildAndExpand().toUri();

        return ResponseEntity.created(uri).body(authService.signup(dto));
    }

}
