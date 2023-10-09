package br.com.teachgram.api.infra.constant;

public class VAR {
    public static final String SECRET_PATH = "${api.security.token.secret}";
    public static final String FRONT_END_PATH = "${api.security.cors.front-end}";

    public static final String ISSUER = "Teachgram";
    public static final String TOKEN_TYPE = "Bearer";
    public static final String OFFSET = "-03:00";
    public static final String PT = "pt";
    public static final String EN = "en";
    public static final String BASENAME = "messages";
    public static final String ENCODE = "UTF-8";
    public static final long REFRESH_TOKEN_EXPIRATION = 30;
    public static final long ACCESS_TOKEN_EXPIRATION = 5;
}
