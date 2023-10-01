package br.com.teachgram.api.infra.locale;

import br.com.teachgram.api.infra.constant.VAR;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;
import java.util.List;
import java.util.Locale;

@Configuration
public class LanguageConfig {

    public static final List<Locale> LOCALES = Arrays.asList(
            new Locale.Builder()
                    .setLanguage(VAR.EN)
                    .build(),
            new Locale.Builder()
                    .setLanguage(VAR.PT)
                    .build()
    );

}
