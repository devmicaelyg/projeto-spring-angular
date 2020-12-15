import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Cliente } from 'src/app/clientes/model/clientes';
import { ClientesService } from 'src/app/services/clientes.service';
import { ServicosService } from 'src/app/services/servicos.service';
import { Servico } from '../model/servico';
import { ActivatedRoute, Params } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-servico-form',
  templateUrl: './servico-form.component.html',
  styleUrls: ['./servico-form.component.css']
})
export class ServicoFormComponent implements OnInit {

  clientes: Cliente[] = [];
  servico: Servico;
  listaAtualizada;
  id: number;
  
  form: FormGroup;
  formSubmetido: boolean = false;
  
  errors: String;
  atualizado: boolean = false;
  success: boolean = false;

  constructor(
    private clientesService: ClientesService,
    private servicosService: ServicosService,
    private activateRoute: ActivatedRoute
  ) {
    this.servico = new Servico;
   }

  ngOnInit(): void {
    this.obterClientes();
    this.editarServico();
    // this.iniciarForm();
  }

//   iniciarForm() {
//     this.form = this.formBuilder.group({
//         id: [null],
//         descricao: [null, [Validators.required, Validators.minLength(3)]],
//         data: [null, [Validators.required, Validators.minLength(3)]],
//         valor: [null]
//     })
// }

// enviarForm() {
//   this.formSubmetido = true;
//   if (!this.form.invalid) {
//       this.onSubmit();
//   }
// }

  obterClientes(){
    this.clientesService.getCliente()
    .subscribe(res => this.clientes = res)
  }

  onSubmit(){
    if(this.servico.id){
      this.atualizarServico(this.servico)
    } else {
      this.servicosService.salvar(this.servico)
      .subscribe(res => {
        this.success = true;
        this.errors = null;
        this.servico= res;
      }, errorResponse => {
        this.success = false;
        this.errors = errorResponse.error.errors
      }
      )
    }
  }

  editarServico(){
    let params: Observable<Params> = this.activateRoute.params;
    params.subscribe(urlParams => {
      this.id = urlParams['id'];
      if(this.id){
        this.servicosService.obterPorId(this.id).
          subscribe(res => {
            this.servico = res,
              errorResponse => this.servico = new Servico()
          })
      }
    })
  }

  atualizarServico(servico){
    this.servicosService.atualizar(servico).
    subscribe(res => {
      this.atualizado = true,
      this.listaAtualizada = res
    })
  }

}
