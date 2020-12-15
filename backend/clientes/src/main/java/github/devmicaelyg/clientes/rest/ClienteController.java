package github.devmicaelyg.clientes.rest;

import github.devmicaelyg.clientes.model.entity.Cliente;
import github.devmicaelyg.clientes.model.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/clientes")
public class ClienteController {

    @Autowired
    private final ClienteRepository repository;

    public ClienteController(ClienteRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Cliente salvar (@RequestBody @Valid Cliente cliente){
        return repository.save(cliente);
    }

    @GetMapping
    public List<Cliente> listarCliente(){
        return repository.findAll();
    }

    @GetMapping("{id}")
    public Cliente obterPorId(@PathVariable  Integer id){
        return  repository
                .findById(id)
                .orElseThrow( () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente não encontrado") );
    }

    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletarCliente(@PathVariable Integer id){
        repository
                .findById(id)
                .map( cliente -> {
                    repository.delete(cliente);
                    return Void.TYPE;
                })
                .orElseThrow( () -> new ResponseStatusException(HttpStatus.NOT_FOUND) );
    }

    @PutMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void atualizar( @PathVariable Integer id, @RequestBody Cliente clienteAtualizado){
        repository
                .findById(id)
                .map( cliente -> {
                  cliente.setNome(clienteAtualizado.getNome());
                  cliente.setCpf(clienteAtualizado.getCpf());
                  return  repository.save(clienteAtualizado);
                })
                .orElseThrow( () -> new ResponseStatusException(HttpStatus.NOT_FOUND) );
    }
}
