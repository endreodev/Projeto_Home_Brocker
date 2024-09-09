import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { DashboardRoutingModule } from './dashboard-routing.module'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { EmpresaComponent } from './pages/cadastros/empresa/empresa.component';
import { EmpresaEditarComponent } from './pages/cadastros/empresa/empresa-editar/empresa-editar.component';
import { ParceiroCadastroComponent } from './pages/cadastros/parceiro/parceiro.component';
import { ParceiroEditarComponent } from './pages/cadastros/parceiro/parceiro-editar/parceiro-editar.component';
import { ParceiroAdicionarComponent } from './pages/cadastros/parceiro/parceiro-adicionar/parceiro-adicionar.component';
import { GrupoComponent } from './pages/cadastros/grupo/grupo.component';
import { GrupoEditarComponent } from './pages/cadastros/grupo/grupo-editar/grupo-editar.component';
import { GrupoAdicionarComponent } from './pages/cadastros/grupo/grupo-adicionar/grupo-adicionar.component';
import { UsuarioComponent } from './pages/cadastros/usuario/usuario.component';
import { UsuarioAdicionarComponent } from './pages/cadastros/usuario/usuario-adicionar/usuario-adicionar.component';
import { UsuarioEditarComponent } from './pages/cadastros/usuario/usuario-editar/usuario-editar.component';
import { LancamentoLimiteComponent } from './pages/cadastros/lancamento-limite/lancamento-limite.component';  

import { NgxMaskDirective, NgxMaskPipe, provideEnvironmentNgxMask, provideNgxMask } from 'ngx-mask';
import { NumberFormatBRPipe } from '../service/diretivas/numberFormatBR';
import { SidenavComponent } from './components/sidenav/sidenav.component';


@NgModule({
  declarations: [
    HomeComponent,
    EmpresaComponent,
    EmpresaEditarComponent,
    ParceiroCadastroComponent,
    ParceiroEditarComponent,
    ParceiroAdicionarComponent,
    GrupoComponent,
    GrupoEditarComponent,
    GrupoAdicionarComponent,
    UsuarioComponent,
    UsuarioAdicionarComponent,
    UsuarioEditarComponent,
    LancamentoLimiteComponent, 
    NumberFormatBRPipe, SidenavComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DashboardRoutingModule, 
    FormsModule,
    ReactiveFormsModule,
    NgxMaskDirective ,
    NgxMaskPipe,
  ]
})
export class DashboardModule { }
