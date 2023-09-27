package br.com.teachgram.api.infra.i18n;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;
import java.util.List;
import java.util.Locale;

@Configuration
public class LanguageConfig {

    public static final List<Locale> LOCALES = Arrays.asList(
            new Locale.Builder()
                    .setLanguage("en")
                    .build(),
            new Locale.Builder()
                    .setLanguage("pt")
                    .build()
    );

}
