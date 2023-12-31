package br.com.teachgram.api.infra.filter;

import br.com.teachgram.api.infra.constant.MESSAGE;
import br.com.teachgram.api.infra.constant.VAR;
import br.com.teachgram.api.infra.exception.AuthException;
import br.com.teachgram.api.infra.exception.DeletedAccountException;
import br.com.teachgram.api.repository.UserRepository;
import br.com.teachgram.api.service.MessageService;
import br.com.teachgram.api.service.TokenService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class SecurityFilter extends OncePerRequestFilter {

    private final TokenService tokenService;
    private final UserRepository userRepository;
    private final MessageService messageService;

    @Autowired
    public SecurityFilter(
            TokenService tokenService,
            UserRepository userRepository,
            MessageService messageService
    ) {
        this.tokenService = tokenService;
        this.userRepository = userRepository;
        this.messageService = messageService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        var token = recoverToken(request);

        if (token != null) {
            var subject = tokenService.validateToken(token);
            var user = userRepository.findUserDetailsById(subject).orElseThrow(() -> new AuthException(messageService.getMessage(MESSAGE.INVALID_TOKEN)));

            if (!user.isEnabled()) throw new DeletedAccountException(messageService.getMessage(MESSAGE.USER_DELETED));

            var authentication = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }

        filterChain.doFilter(request, response);
    }

    private String recoverToken(HttpServletRequest request) {
        var token = request.getHeader("Authorization");

        if (token != null) {
            return token.replace(VAR.TOKEN_TYPE + " ", "");
        }

        return null;
    }

}
