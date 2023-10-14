import { Injectable } from '@angular/core';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  constructor(private _CookieService: CookieService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let req = request.clone({
      headers: request.headers.set(
        'token',
        this._CookieService.get('userToken')
      ),
    });
    return next.handle(req);
  }
}
