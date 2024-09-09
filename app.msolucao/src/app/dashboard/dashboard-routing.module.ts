// dashboard-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { PainelGuard } from '../guards/painel.guard';
import { EmpresaComponent } from './pages/cadastros/empresa/empresa.component';
import { EmpresaEditarComponent } from './pages/cadastros/empresa/empresa-editar/empresa-editar.component'; 
import { ParceiroAdicionarComponent } from './pages/cadastros/parceiro/parceiro-adicionar/parceiro-adicionar.component';
import { ParceiroEditarComponent } from './pages/cadastros/parceiro/parceiro-editar/parceiro-editar.component';
import { ParceiroCadastroComponent } from './pages/cadastros/parceiro/parceiro.component';
import { GrupoComponent } from './pages/cadastros/grupo/grupo.component';
import { GrupoAdicionarComponent } from './pages/cadastros/grupo/grupo-adicionar/grupo-adicionar.component';
import { GrupoEditarComponent } from './pages/cadastros/grupo/grupo-editar/grupo-editar.component';
import { UsuarioComponent } from './pages/cadastros/usuario/usuario.component';
import { UsuarioAdicionarComponent } from './pages/cadastros/usuario/usuario-adicionar/usuario-adicionar.component';
import { UsuarioEditarComponent } from './pages/cadastros/usuario/usuario-editar/usuario-editar.component';
import { LancamentoLimiteComponent } from './pages/cadastros/lancamento-limite/lancamento-limite.component';

const dashboardRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' }, 
      // { path: 'home', component: HomeComponent }, 
      { path: 'home', component: HomeComponent }, 

      { path: 'empresa', component: EmpresaComponent }, 
      // { path: 'empresa/adicionar', component: EmpresaComponent }, 
      { path: 'empresa/editar/:id', component: EmpresaEditarComponent }, 

      { path: 'parceiro', component: ParceiroCadastroComponent }, 
      { path: 'parceiro/adicionar', component: ParceiroAdicionarComponent }, 
      { path: 'parceiro/editar/:id', component: ParceiroEditarComponent }, 

      { path: 'grupo', component: GrupoComponent }, 
      { path: 'grupo/adicionar', component: GrupoAdicionarComponent }, 
      { path: 'grupo/editar/:id', component: GrupoEditarComponent }, 

      { path: 'lancamento-limite', component: LancamentoLimiteComponent }, 
      // { path: 'limite-grupo/adicionar', component: GrupoAdicionarComponent }, 
      // { path: 'limite-grupo/editar/:id', component: GrupoEditarComponent }, 

      { path: 'usuario', component: UsuarioComponent }, 
      { path: 'usuario/adicionar', component: UsuarioAdicionarComponent }, 
      { path: 'usuario/editar/:id', component: UsuarioEditarComponent }, 


    ], canActivate: [PainelGuard] 
  },
];


@NgModule({
  imports: [RouterModule.forChild(dashboardRoutes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }