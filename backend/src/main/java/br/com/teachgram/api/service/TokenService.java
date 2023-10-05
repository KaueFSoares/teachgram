package br.com.teachgram.api.service;

import br.com.teachgram.api.infra.constant.MESSAGE;
import br.com.teachgram.api.infra.constant.VAR;
import br.com.teachgram.api.domain.user.dto.LoginResponseDTO;
import br.com.teachgram.api.infra.exception.AuthException;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Service
public class TokenService {

    private final MessageService messageService;

    @Autowired
    public TokenService(MessageService messageService) {
        this.messageService = messageService;
    }

    @Value(VAR.SECRET_PATH)
    private String secret;

    public LoginResponseDTO generateToken(String id) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);

            var accessToken =  JWT.create()
                    .withIssuer(VAR.ISSUER)
                    .withSubject(id)
                    .withExpiresAt(getAccessTokenExpirationDate())
                    .sign(algorithm);

            var refreshToken =  JWT.create()
                    .withIssuer(VAR.ISSUER)
                    .withSubject(id)
                    .withExpiresAt(getRefreshTokenExpirationDate())
                    .sign(algorithm);


            return new LoginResponseDTO(
                    VAR.TOKEN_TYPE,
                    accessToken,
                    getAccessTokenExpirationDate().toEpochMilli(),
                    refreshToken,
                    getRefreshTokenExpirationDate().toEpochMilli()
            );

        } catch (JWTCreationException exception){
            throw new AuthException(messageService.getMessage(MESSAGE.TOKEN_CREATION_ERROR));
        }
    }

    public String validateToken(String token) {

        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            return JWT.require(algorithm)
                    .withIssuer(VAR.ISSUER)
                    .build()
                    .verify(token)
                    .getSubject();

        } catch (JWTVerificationException exception){
            throw new AuthException(messageService.getMessage(MESSAGE.TOKEN_VALIDATION_ERROR));
        }
    }

    private Instant getAccessTokenExpirationDate() {
        return LocalDateTime.now().plusMinutes(VAR.ACCESS_TOKEN_EXPIRATION).toInstant(ZoneOffset.of(VAR.OFFSET));
    }

    private Instant getRefreshTokenExpirationDate() {
        return LocalDateTime.now().plusDays(VAR.REFRESH_TOKEN_EXPIRATION).toInstant(ZoneOffset.of(VAR.OFFSET));
    }
}

