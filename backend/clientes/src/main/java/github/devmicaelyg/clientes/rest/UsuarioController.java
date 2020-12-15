package github.devmicaelyg.clientes.rest;

import github.devmicaelyg.clientes.exception.UsuarioCadastradoException;
import github.devmicaelyg.clientes.model.entity.Usuario;
import github.devmicaelyg.clientes.model.repository.UsuarioRepository;
import github.devmicaelyg.clientes.service.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;

@RestController
@RequestMapping("api/usuarios")
@RequiredArgsConstructor
public class UsuarioController {

    private final UsuarioService usuarioService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void salvar(@RequestBody @Valid Usuario usuario){
        try{
            usuarioService.save(usuario);
        } catch (UsuarioCadastradoException e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }
}
