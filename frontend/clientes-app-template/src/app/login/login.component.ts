import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string;
  password: string; 
  loginError: boolean = false;
  cadastrando: boolean;

  constructor() { }

  onSubmit(){
    console.log(`User: ${this.username}, Pass: ${this.password}`)
  }

  preparaCadastrar(event){
    event.preventDefault();
    this.cadastrando = true
  }

  cancelaCadastro(){
    this.cadastrando = false; 
  }
}
