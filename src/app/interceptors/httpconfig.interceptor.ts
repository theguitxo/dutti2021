import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { LoadingService } from '../services/loading.service';

@Injectable({
  providedIn: 'root',
})
export class HttpRequestsInterceptor implements HttpInterceptor {
  constructor(
    private loadingService: LoadingService,
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadingService.startLoading();

    return next.handle(request).pipe(
      finalize(() => {
        this.loadingService.finishLoading();
      }),
    );
  }
}
