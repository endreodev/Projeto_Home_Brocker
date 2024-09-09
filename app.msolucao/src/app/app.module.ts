import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NavItemComponent } from './component/nav-item/nav-item.component';
import { NoficicacaoComponent } from './component/noficicacao/noficicacao.component';
import { PerfilUsuarioComponent } from './component/perfil-usuario/perfil-usuario.component';
import { LoadingInterceptorService } from './service/loading-interceptor.service';
import { AuthService } from './service/auth.service';
import { PainelGuard } from './guards/painel.guard';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ParceiroComponent } from './component/parceiro/parceiro.component';
import { LoadingComponent } from './component/loading/loading.component'; 
import { registerLocaleData } from '@angular/common';
import pt from '@angular/common/locales/pt';
import { ambiente, environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireMessagingModule } from '@angular/fire/compat/messaging'; 
import { IConfig, provideEnvironmentNgxMask } from 'ngx-mask'
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

registerLocaleData(pt);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    NavItemComponent,
    NoficicacaoComponent,
    PerfilUsuarioComponent,
    ParceiroComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule, 
    SweetAlert2Module,
    AppRoutingModule,
    DashboardModule,
    AngularFireModule.initializeApp(ambiente.firebase),
    AngularFireMessagingModule,
    // ServiceWorkerModule.register('ngsw-config.json', { enabled: ambiente.production }),
  ],
  providers: [
    AuthService,PainelGuard,
    { provide: LOCALE_ID, useValue: 'pt' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptorService, multi: true },
    provideNgxMask(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


// provideFirebaseApp(() => initializeApp({"projectId":"homebrokerdtvm","appId":"1:623742963048:web:247d2f9d3648d33f685add","storageBucket":"homebrokerdtvm.appspot.com","apiKey":"AIzaSyC-9OLaUHnD8lo39K8VN0vvlqvo2_69gfI","authDomain":"homebrokerdtvm.firebaseapp.com","messagingSenderId":"623742963048","measurementId":"G-61J2XSH97C"})),
    // provideMessaging(() => getMessaging()),