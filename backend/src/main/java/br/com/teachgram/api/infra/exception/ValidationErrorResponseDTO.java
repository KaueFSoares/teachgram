package br.com.teachgram.api.infra.exception;

import org.springframework.validation.FieldError;

public record ValidationErrorResponseDTO(
        String field,
        String message
) {
    public ValidationErrorResponseDTO(FieldError fieldError) {
        this(fieldError.getField(), fieldError.getDefaultMessage());
    }
}
