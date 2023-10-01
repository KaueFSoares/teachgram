package br.com.teachgram.api.constant;

public class MESSAGE {
    public static final String USER_NOT_FOUND = "error.user.not-found";
    public static final String USER_UNAUTHORIZED = "error.user.unauthorized";
    public static final String USER_FRIEND_NOT_FOUND = "error.user.friend-not-found";
    public static final String USER_DELETED = "error.user.deleted";

    public static final String TOKEN_CREATION_ERROR = "error.token.creation";
    public static final String TOKEN_VALIDATION_ERROR = "error.token.validation";
    public static final String INVALID_TOKEN = "error.token.invalid";

    public static final String POST_NOT_FOUND = "error.post.not-found";
    public static final String POST_UNAUTHORIZED = "error.post.unauthorized";

    public static final String TITLE_NOT_EMPTY = "{validation.post.title.not-empty}";
    public static final String DESCRIPTION_NOT_EMPTY = "{validation.post.description.not-empty}";

    public static final String EMAIL_NOT_EMPTY = "{validation.user.email.not-empty}";
    public static final String PASSWORD_NOT_EMPTY = "{validation.user.password.not-empty}";
    public static final String REFRESH_TOKEN_NOT_EMPTY = "{validation.user.refresh-token.not-empty}";
    public static final String NAME_NOT_EMPTY = "validation.user.name.not-empty";
    public static final String BIO_NOT_EMPTY = "validation.user.bio.not-empty";
    public static final String USERNAME_NOT_EMPTY = "validation.user.username.not-empty";

    public static final String PHONE_DUPLICATED = "validation.user.phone.duplicated";
    public static final String EMAIL_DUPLICATED = "validation.user.email.duplicated";
    public static final String USERNAME_DUPLICATED = "validation.user.username.duplicated";

    public static final String EMAIL_INVALID = "validation.user.email.invalid";

    public static final String DELETED_USER = "message.deleted.user";
    public static final String DELETED_FRIEND = "message.deleted.friend";
    public static final String DELETED_POST = "message.deleted.post";

}
