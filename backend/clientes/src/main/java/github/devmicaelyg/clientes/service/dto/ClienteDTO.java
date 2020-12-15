package github.devmicaelyg.clientes.service.dto;


import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class ClienteDTO {

    private Integer id;

    private String nome;

    private String cpf;

    private LocalDate dataCadastro;
}
