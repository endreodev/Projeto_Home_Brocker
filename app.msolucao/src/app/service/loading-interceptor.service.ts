import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, finalize } from 'rxjs';
import { LoadingService } from './loading.service';


@Injectable({
  providedIn: 'root'
})
export class LoadingInterceptorService {

  constructor(
    private loadingService: LoadingService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    this.loadingService.showLoading();

    const token = localStorage.getItem('access_token') ?? '';
    const cUrl: string = "login";
    let authRequest: any;

      authRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });

    return next.handle(authRequest).pipe(
      finalize(() => this.loadingService.hideLoading())
    );
  }
}