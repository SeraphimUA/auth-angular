import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private readonly authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const rawToken = this.authService.token$.value;

    if (rawToken) {
      const headers = new HttpHeaders({
        "Authorization": `Bearer ${rawToken}`
      });
      const copy = request.clone({
        headers: headers
      })
      return next.handle(copy);
    }
    
    return next.handle(request);
  }
}
