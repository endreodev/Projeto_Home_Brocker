import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthAdmin } from '../service/auth.admin';


@Injectable({
  providedIn: 'root',
})

export class AdminGuard implements CanActivate {

  constructor(
    private authAdmin: AuthAdmin, 
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> |boolean {

    if(this.authAdmin.usuarioAdministrador()){
      return true;
    }
    
    this.router.navigate(['/dashboard/sell']);
    return false;

  }
}