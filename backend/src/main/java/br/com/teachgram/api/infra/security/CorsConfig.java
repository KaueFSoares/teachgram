package br.com.teachgram.api.infra.security;

import br.com.teachgram.api.infra.constant.ROUTE;
import br.com.teachgram.api.infra.constant.VAR;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Value(VAR.FRONT_END_PATH)
    private String FRONT_END;
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD", "TRACE", "CONNECT")
                        .allowedOrigins(FRONT_END);
            }
        };
    }

}
