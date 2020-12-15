import { Injectable } from '@angular/core';
import { Cliente } from '../clientes/model/clientes';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  api = 'http://localhost:8080/api/clientes';

  constructor(private http: HttpClient) { }

  salvar(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.api, cliente)
  }

  getCliente(): Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.api)
  }

  deletarCliente(cliente: Cliente): Observable <Cliente>{
    return this.http.delete<Cliente>(`http://localhost:8080/api/clientes/${cliente.id}`);
  }

  obterPorId(id: number): Observable <Cliente>{
    return this.http.get<any>(`http://localhost:8080/api/clientes/${id}`);
  }

  atualizar(cliente: Cliente): Observable<any>{
    return this.http.put<Cliente>(`http://localhost:8080/api/clientes/${cliente.id}`, cliente);
  }

}
