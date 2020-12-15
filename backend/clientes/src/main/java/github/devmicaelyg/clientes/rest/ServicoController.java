package github.devmicaelyg.clientes.rest;

import github.devmicaelyg.clientes.model.entity.Cliente;
import github.devmicaelyg.clientes.model.entity.Servico;
import github.devmicaelyg.clientes.model.repository.ClienteRepository;
import github.devmicaelyg.clientes.model.repository.ServicoRepository;
import github.devmicaelyg.clientes.rest.dto.ServicoDTO;
import github.devmicaelyg.clientes.util.BigDecimalConverter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/servicos")
public class ServicoController {

    @Autowired
    private final ServicoRepository servicoRepository;
    private final ClienteRepository clienteRepository;
    private final BigDecimalConverter bigDecimalConverter;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Servico salvar(@RequestBody @Valid ServicoDTO servicoDTO){
        LocalDate data = LocalDate.parse(servicoDTO.getData(), DateTimeFormatter.ofPattern("dd/MM/yyyy"));
        Integer idCLiente = servicoDTO.getIdCliente();

        Cliente cliente = clienteRepository
                .findById(idCLiente)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Cliente inexistente."));

        Servico servico = new Servico();
        servico.setDescricao(servicoDTO.getDescricao());
        servico.setData(data);
        servico.setCliente(cliente);
        servico.setValor(bigDecimalConverter.converter(servicoDTO.getValor()));

        return servicoRepository.save(servico);
    }

    @GetMapping
    public List<Servico> listarServicos(){
        return servicoRepository.findAll();
    }

//    @GetMapping("{id}")
//    public List<Servico> listarPorCliente(@PathVariable Integer idCliente){
//        return servicoRepository.findByClienteId(idCliente);
//    }

    @GetMapping("{id}")
    public Servico obterPorId(@PathVariable  Integer id){
        return  servicoRepository
                .findById(id)
                .orElseThrow( () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Serviço não encontrado") );
    }

    @GetMapping("pesquisar")
    public List<Servico> pesquisar(
            @RequestParam(value = "nome", required = false, defaultValue="") String nome,
            @RequestParam(value = "mes", required = false) Integer mes) {

        return servicoRepository.findByNomeClienteAndMes("%" + nome +"%", mes);
    }

    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletarServico(@PathVariable Integer id){
        servicoRepository.findById(id)
                .map( servico -> {
                    servicoRepository.delete(servico);
                    return Void.TYPE;
                })
                .orElseThrow( () -> new ResponseStatusException(HttpStatus.NOT_FOUND) );
    }

    @PutMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void atualizar( @PathVariable Integer id, @RequestBody Servico servicoAtualizado){
        servicoRepository
                .findById(id)
                .map( servico -> {
                    servico.setDescricao(servicoAtualizado.getDescricao());
                    servico.setValor(servicoAtualizado.getValor());
                    servico.setCliente(servicoAtualizado.getCliente());
                    servico.setData(servicoAtualizado.getData());
                    return servicoRepository.save(servicoAtualizado);
                })
                .orElseThrow( () -> new ResponseStatusException(HttpStatus.NOT_FOUND) );
    }
}
