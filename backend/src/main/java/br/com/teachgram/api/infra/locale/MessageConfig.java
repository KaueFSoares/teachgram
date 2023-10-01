package br.com.teachgram.api.infra.locale;

import br.com.teachgram.api.constant.VAR;
import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ResourceBundleMessageSource;
import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean;

@Configuration
public class MessageConfig {

    @Bean
    public MessageSource messageSource() {
        var messageSource = new ResourceBundleMessageSource();

        messageSource.setBasename(VAR.BASENAME);
        messageSource.setDefaultEncoding(VAR.ENCODE);

        return messageSource;
    }

    @Bean
    public LocalValidatorFactoryBean getValidator() {
        LocalValidatorFactoryBean bean = new LocalValidatorFactoryBean();
        bean.setValidationMessageSource(messageSource());
        return bean;
    }

}
