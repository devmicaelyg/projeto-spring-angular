package github.devmicaelyg.clientes.rest.exception;

import lombok.Getter;

import java.util.List;
import java.util.Arrays;


public class ApiErrors {

    @Getter
    private List<String> errors;

    public ApiErrors(List<String> errors){
        this.errors = errors;
    }

    public ApiErrors(String message){
        this.errors = Arrays.asList(message);
    }
}
