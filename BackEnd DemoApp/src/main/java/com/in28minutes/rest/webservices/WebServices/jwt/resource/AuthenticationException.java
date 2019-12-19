package com.in28minutes.rest.webservices.WebServices.jwt.resource;

/**
 *
 * @author Gebruiker
 */

public class AuthenticationException extends RuntimeException {
    public AuthenticationException(String message, Throwable cause) {
        super(message, cause);
    }
}