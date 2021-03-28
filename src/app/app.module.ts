import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { PrincipalModule } from './modules/principal/principal.module';
import { AuthenticationModule } from './modules/authentication/authentication.module';

// Components
import { AppComponent } from './app.component';
import { PrincipalComponent } from './modules/principal/principal/principal.component';

// Services
import { UsersService } from './services/users.service';
import { StorageService } from './services/storage.service';
import { CanLoadPrincipalGuard } from './services/guards.service';
import { AuthenticationService } from './services/authentication.service';
import { NgxsModule } from '@ngxs/store';
import { ShipsState } from './store/ships.state';
import { CacheService } from './services/cache.service';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpRequestsInterceptor } from './interceptors/httpconfig.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PrincipalModule,
    AuthenticationModule,
    NgxsModule.forRoot([
      ShipsState
    ]),
  ],
  providers: [
    AuthenticationService,
    UsersService,
    StorageService,
    CanLoadPrincipalGuard,
    CacheService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestsInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
