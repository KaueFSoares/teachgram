package br.com.teachgram.api.infra.exception;

public class DeletedAccountException extends RuntimeException {
    public DeletedAccountException(String message) {
        super(message);
    }
}
