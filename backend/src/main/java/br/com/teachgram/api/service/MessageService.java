package br.com.teachgram.api.service;

import br.com.teachgram.api.infra.locale.CustomLocaleResolver;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Service
public class MessageService {

    private final MessageSource messageSource;
    private final CustomLocaleResolver customLocaleResolver;

    @Autowired
    public MessageService(
            MessageSource messageSource,
            CustomLocaleResolver customLocaleResolver
    ) {
        this.messageSource = messageSource;
        this.customLocaleResolver = customLocaleResolver;
    }

    public String getMessage (String key) {
        return messageSource.getMessage(key, null, customLocaleResolver.resolveLocale(((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest()));
    }

}
