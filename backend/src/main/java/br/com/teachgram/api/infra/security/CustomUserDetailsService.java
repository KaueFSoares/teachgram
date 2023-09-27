package br.com.teachgram.api.infra.security;

import br.com.teachgram.api.infra.exception.AuthException;
import br.com.teachgram.api.repository.UserRepository;
import br.com.teachgram.api.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;
    private final MessageService messageService;

    @Autowired
    public CustomUserDetailsService(
            UserRepository userRepository,
            MessageService messageService
    ) {
        this.userRepository = userRepository;
        this.messageService = messageService;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findUserDetailsByEmail(username).orElseThrow(() -> new AuthException(messageService.getMessage("error.user.not-found")));
    }
}
