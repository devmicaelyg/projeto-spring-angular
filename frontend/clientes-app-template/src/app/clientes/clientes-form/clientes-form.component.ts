import { Component, OnInit } from '@angular/core';

import { Cliente } from '../model/clientes';
import { ClientesService } from '../../services/clientes.service';
import { ActivatedRoute, Params } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.css']
})
export class ClientesFormComponent implements OnInit {

  cliente: Cliente;
  success: boolean = false;
  errors: String[];
  atualizado: boolean = false;
  id: number;
  listaAtualizada: Cliente[]

  params: BehaviorSubject<Params>;

  constructor(
    private clientesService: ClientesService,
    private activateRoute: ActivatedRoute
  ) {
    this.cliente = new Cliente();
  }

  ngOnInit(): void {
    this.editarCliente();

  }

  onSubmit() {
    if (this.cliente.id) {
      this.atualizarCLiente(this.cliente)
    } else {
      this.clientesService.salvar(this.cliente).
        subscribe(res => {
          this.success = true;
          this.errors = null;
          this.cliente = res;
        }, errorResponse => {
          this.success = false;
          this.errors = errorResponse.error.errors
        }
        )
    }
  }

  editarCliente() {
    let params: Observable<Params> = this.activateRoute.params;
    params.subscribe(urlParams => {
      this.id = urlParams['id'];
      if(this.id){
        this.clientesService.obterPorId(this.id).
          subscribe(res => {
            this.cliente = res,
              errorResponse => this.cliente = new Cliente()
          })
      }
    })
  }


  atualizarCLiente(cliente) {
    this.clientesService.atualizar(cliente).
      subscribe(res => {
        this.atualizado = true,
          this.listaAtualizada = res
      })
  }
}
