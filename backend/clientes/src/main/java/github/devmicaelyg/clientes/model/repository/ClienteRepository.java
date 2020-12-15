package github.devmicaelyg.clientes.model.repository;

import github.devmicaelyg.clientes.model.entity.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClienteRepository extends JpaRepository<Cliente, Integer> {
}
