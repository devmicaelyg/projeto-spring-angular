import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Servico } from '../servico/model/servico';

@Injectable({
  providedIn: 'root'
})
export class ServicosService {

  api = 'http://localhost:8080/api/servicos';

  constructor(private http: HttpClient) { }

  salvar(servico: Servico): Observable<Servico>{
    return this.http.post<Servico>(this.api, servico);
  }

  listarServicos(): Observable<Servico[]>{
    return this.http.get<Servico[]>('http://localhost:8080/api/servicos');
  }

  deletarServico(servico: Servico): Observable<Servico>{
      return this.http.delete<Servico>(`http://localhost:8080/api/servicos/${servico.id}`)
  }

  obterPorId(id: number): Observable <Servico>{
    return this.http.get<any>(`http://localhost:8080/api/servicos/${id}`);
  }

  atualizar(servico: Servico): Observable<Servico>{
    return this.http.put<Servico>(`http://localhost:8080/api/servicos/${servico.id}`, servico);
  }

  buscar(nome: string, mes: number): Observable<any>{
    const httpParams = new HttpParams()
    .set("nome", nome)
    .set("mes", mes ? mes.toString() : '');
   
    const url = 'http://localhost:8080/api/servicos/pesquisar' + '?' + httpParams.toString()
    console.log(url)
    return this.http.get<any>(url);
  }
}
