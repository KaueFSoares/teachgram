package br.com.teachgram.api.infra.locale;

import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ResourceBundleMessageSource;

@Configuration
public class MessageConfig {

    @Bean
    public MessageSource messageSource() {
        var messageSource = new ResourceBundleMessageSource();

        messageSource.setBasename("messages");
        messageSource.setDefaultEncoding("UTF-8");

        return messageSource;
    }

}
