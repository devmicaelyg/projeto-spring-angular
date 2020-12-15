package github.devmicaelyg.clientes.rest.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
public class ServicoDTO {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 150)
    @NotEmpty(message = "O campo descrição é obrigatório")
    private String descricao;

    @Column(nullable = false, length = 150)
    @NotEmpty(message = "O campo de valor é obrigatório")
    private String valor;

    @Column(nullable = false, length = 150)
    @NotEmpty(message = "O campo de data é obrigatório")
    private String data;

    @Column(nullable = false, length = 150)
    @NotNull (message = "O campo de cliente é obrigatório")
    private Integer idCliente;
}
