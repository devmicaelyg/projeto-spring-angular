import { trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/clientes/model/clientes';
import { ClientesService } from 'src/app/services/clientes.service';
import { ServicosService } from 'src/app/services/servicos.service';
import { Servico } from '../model/servico';

@Component({
  selector: 'app-servico-list',
  templateUrl: './servico-list.component.html',
  styleUrls: ['./servico-list.component.css']
})
export class ServicoListComponent implements OnInit {

  listarServicos: Servico[];
  servicos: Servico[];
  servico: Servico;
  servicoSelecionado;

  listaClientes: Cliente[];
  cliente: Cliente;

  success: boolean = false; 
  errors: String;

  constructor(
    private servicosService: ServicosService,
    private clientesService: ClientesService
  ) {
    this.servico = new Servico;
   }

  ngOnInit(): void {
    this.getServicos();
  }

  getServicos(){
   this.servicosService.listarServicos()
    .subscribe(res => this.servicos = res);
  }


  filtrarClientePorId(id: number) {
    this.cliente = this.listaClientes.find(cliente => cliente.id == id);
    return this.cliente;
  }

  preparaDelecao(servico: Servico){
    this.servicoSelecionado = servico;
  }

  deletarServico(id: number){
    this.servicosService.deletarServico(this.servicoSelecionado)
    .subscribe(() => {
      this.getServicos(),
      this.success = true;
    }, errorResponse => {
      this.errors = "Não foi possível deletar o cliente!"
    });
  }


}
