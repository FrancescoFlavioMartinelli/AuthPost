import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable  } from 'rxjs';
import { take, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authSrv:AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.authSrv.authObs.pipe(take(1),switchMap(user=>{
      if(!user) {
        return next.handle(request)
      }
      const newReq = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${user.AccessToken}`)
      })
      return next.handle(newReq)
    }))
  }
}
