package br.com.teachgram.api.service;

import br.com.teachgram.api.domain.user.dto.LoginResponseDTO;
import br.com.teachgram.api.infra.exception.AuthException;
import com.auth0.jwt.JWT;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import com.auth0.jwt.algorithms.Algorithm;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Service
public class TokenService {
    @Value("${api.security.token.secret}")
    private String secret;

    public LoginResponseDTO generateToken(String email) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);

            var accessToken =  JWT.create()
                    .withIssuer("Teachgram")
                    .withSubject(email)
                    .withExpiresAt(getAccessTokenExpirationDate())
                    .sign(algorithm);

            var refreshToken =  JWT.create()
                    .withIssuer("Teachgram")
                    .withSubject(email)
                    .withExpiresAt(getRefreshTokenExpirationDate())
                    .sign(algorithm);


            return new LoginResponseDTO(
                    "Bearer",
                    accessToken,
                    getAccessTokenExpirationDate().toEpochMilli(),
                    refreshToken,
                    getRefreshTokenExpirationDate().toEpochMilli()
            );

        } catch (JWTCreationException exception){
            throw new AuthException("Error while creating token!");
        }
    }

    public String validateToken(String token) {

        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            return JWT.require(algorithm)
                    .withIssuer("Teachgram")
                    .build()
                    .verify(token)
                    .getSubject();

        } catch (JWTVerificationException exception){
            throw new AuthException("Invalid token!");
        }
    }

    private Instant getAccessTokenExpirationDate() {
        return LocalDateTime.now().plusHours(2).toInstant(ZoneOffset.of("-03:00"));
    }

    private Instant getRefreshTokenExpirationDate() {
        return LocalDateTime.now().plusDays(30).toInstant(ZoneOffset.of("-03:00"));
    }
}

