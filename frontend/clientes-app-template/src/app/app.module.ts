import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TemplateModule } from './template/template.module';
import { HomeComponent } from './home/home.component'
import { ClientesModule } from './clientes/clientes.module';
import { ClientesService } from './services/clientes.service';
// import {ConfirmationService} from 'primeng/api';

import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { ServicoModule } from './servico/servico.module';
import { ServicosService } from './services/servicos.service';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    LayoutComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TemplateModule,
    ClientesModule,
    HttpClientModule,
    ConfirmDialogModule,
    ServicoModule,
    FormsModule

  ],
  providers: [
    ClientesService,
    ServicosService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
