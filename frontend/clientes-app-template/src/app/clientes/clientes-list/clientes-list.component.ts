import { Component, OnInit } from '@angular/core';
import { ClientesService } from 'src/app/services/clientes.service';
import { Cliente } from '../model/clientes';


@Component({
  selector: 'app-clientes-list',
  templateUrl: './clientes-list.component.html',
  styleUrls: ['./clientes-list.component.css']
})
export class ClientesListComponent implements OnInit {

  clientes: Cliente[];
  cliente;
  success: boolean = false; 
  errors: String;
  id: number;
  clienteSelecionado

  constructor(
    private clientesService: ClientesService,
   ) 
    {
      this.cliente = new Cliente();
     }

  ngOnInit(): void {
      this.listarClientes();
  }

  listarClientes(){
    this.clientesService.getCliente()
    .subscribe(res => this.clientes = res);
  }

  preparaDelecao(cliente: Cliente){
    this.clienteSelecionado = cliente;
  }

  deletarCliente(id: number){
    this.clientesService.deletarCliente(this.clienteSelecionado)
    .subscribe(() => {
      this.listarClientes(),
      this.success = true;
    }, errorResponse => {
      this.errors = "Não foi possível deletar o cliente!"
    });
  }
}
