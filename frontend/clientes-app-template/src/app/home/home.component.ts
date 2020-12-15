import { Component, OnInit } from '@angular/core';
import { ServicosService } from '../services/servicos.service';
import { Servico } from '../servico/model/servico';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  nome: string;
  mes: number;
  meses: number[];
  lista: Servico[];
  message: string;

  constructor(
    private servicoService: ServicosService
  ) {
    this.meses = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
   }

  ngOnInit(): void {
  }

  consultar(){
    this.servicoService.buscar(this.nome, this.mes).
    subscribe(res => {
      this.lista = res
      this.lista.length <= 0 ? this.message = "Nenhum registro encontrado!" : this.message = null;
    })
  }
}
