import { Newpassword } from './newpassword';
import { ResetCode } from './reset-code';
import { Forgotpass } from './forgotpass';
import { Login } from './login';
import { ResgisterInterface } from './resgister-interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import jwtDecode from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userSharedData: BehaviorSubject<any> = new BehaviorSubject(null);
  baseUrl: string = 'https://ecommerce.routemisr.com';
  constructor(
    private _HttpClient: HttpClient,
    private _CookieService: CookieService,
    private _Router: Router
  ) {
    let currentPage = _CookieService.get('currentPage');
    if (this._CookieService.check('userToken')) {
      this.saveData();
      _Router.navigate([currentPage]);
    } else _Router.navigate(['/login']);
  }
  signUp(registerData: ResgisterInterface): Observable<any> {
    return this._HttpClient.post(
      `${this.baseUrl}/api/v1/auth/signup`,
      registerData
    );
  }

  signIn(loginData: Login): Observable<any> {
    return this._HttpClient.post(
      `${this.baseUrl}/api/v1/auth/signin`,
      loginData
    );
  }

  forgotPass(forgotPassData: Forgotpass): Observable<any> {
    return this._HttpClient.post(
      this.baseUrl + '/api/v1/auth/forgotPasswords',
      forgotPassData
    );
  }

  resetCode(resetCodeData: ResetCode): Observable<any> {
    return this._HttpClient.post(
      this.baseUrl + '/api/v1/auth/verifyResetCode',
      resetCodeData
    );
  }

  resetPass(resetPassData: Newpassword): Observable<any> {
    return this._HttpClient.put(
      this.baseUrl + '/api/v1/auth/resetPassword',
      resetPassData
    );
  }

  saveData() {
    if (this._CookieService.check('userToken')) {
      this.userSharedData.next(jwtDecode(this._CookieService.get('userToken')));
    } else this.userSharedData.next(null);
  }
}
