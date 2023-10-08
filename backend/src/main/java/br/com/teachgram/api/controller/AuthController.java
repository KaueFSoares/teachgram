package br.com.teachgram.api.controller;

import br.com.teachgram.api.infra.constant.ROUTE;
import br.com.teachgram.api.domain.user.dto.*;
import br.com.teachgram.api.service.AuthService;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

@RestController
@RequestMapping(ROUTE.AUTH)
public class AuthController {

    private final AuthService authService;

    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PreAuthorize("permitAll()")
    @PostMapping(ROUTE.LOGIN)
    public ResponseEntity<LoginResponseDTO> login(@RequestBody @Valid LoginRequestDTO dto) {
        return ResponseEntity.ok(authService.login(dto));
    }

    @PreAuthorize("permitAll()")
    @PostMapping(ROUTE.REFRESH)
    public ResponseEntity<LoginResponseDTO> refreshToken(@RequestBody @Valid RefreshTokenRequestDTO dto) {
        return ResponseEntity.ok(authService.refreshToken(dto));
    }

    @PreAuthorize("permitAll()")
    @Transactional
    @PostMapping(ROUTE.SIGNUP)
    public ResponseEntity<LoginResponseDTO> signup(@RequestBody @Valid SignupRequestDTO dto, UriComponentsBuilder uriComponentsBuilder) {
        var uri = uriComponentsBuilder.path(ROUTE.USER).buildAndExpand().toUri();

        return ResponseEntity.created(uri).body(authService.signup(dto));
    }

}
