  
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, filter, take, switchMap } from 'rxjs/operators';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(public authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.authService.getJwtToken()) {
      request = this.addToken(request, this.authService.getJwtToken());
    }
    return next.handle(request);
  }

  private addToken(request: HttpRequest<any>, token: string) {
    console.log(token)
    return request.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  // private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
  //   if (!this.isRefreshing) {
  //     this.isRefreshing = true;
  //     this.refreshTokenSubject.next(null);

  //     return this.authService.refreshToken().pipe(
  //       switchMap((token: any) => {
  //         this.isRefreshing = false;
  //         this.refreshTokenSubject.next(token.jwt);
  //         return next.handle(this.addToken(request, token.jwt));
  //       }));

  //   } else {
  //     return this.refreshTokenSubject.pipe(
  //       filter(token => token != null),
  //       take(1),
  //       switchMap(jwt => {
  //         return next.handle(this.addToken(request, jwt));
  //       }));
  //   }
  // }
}