package github.devmicaelyg.clientes.model.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Getter
@Setter
@Data
public class Servico {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 150)
    @NotBlank(message = "O campo descrição é obrigatório")
    private String descricao;

    @ManyToOne
    @JoinColumn(name = "id_cliente")
    private Cliente cliente;

    @Column
    @NotNull(message = "O campo valor é obrigatório")
    private BigDecimal valor;

    @Column
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate data;

}
