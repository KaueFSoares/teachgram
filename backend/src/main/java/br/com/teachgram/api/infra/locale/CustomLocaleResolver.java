package br.com.teachgram.api.infra.locale;

import br.com.teachgram.api.constant.VAR;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.LocaleResolver;

import java.util.Locale;

@Configuration
public class CustomLocaleResolver implements LocaleResolver {
    @Override
    public Locale resolveLocale(HttpServletRequest request) {
        String language = request.getHeader("Accept-Language");

        if (language == null || language.isEmpty()) {
            return Locale.forLanguageTag(VAR.PT);
        }

        var locale = Locale.forLanguageTag(language);

        if (LanguageConfig.LOCALES.contains(locale)) {
            return locale;
        }

        return Locale.forLanguageTag(VAR.PT);
    }

    @Override
    public void setLocale(HttpServletRequest request, HttpServletResponse response, Locale locale) {

    }
}
