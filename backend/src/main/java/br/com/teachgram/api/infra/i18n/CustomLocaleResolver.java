package br.com.teachgram.api.infra.i18n;

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
            return Locale.forLanguageTag("en");
        }

        var locale = Locale.forLanguageTag(language);

        if (LanguageConfig.LOCALES.contains(locale)) {
            return locale;
        }

        return Locale.forLanguageTag("en");
    }

    @Override
    public void setLocale(HttpServletRequest request, HttpServletResponse response, Locale locale) {

    }
}
