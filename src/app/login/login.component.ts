import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CartService } from '../cart.service';
import { BehaviorSubject } from 'rxjs';
import { AlertServiceService } from '../alert-service.service';

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
    private _CookieService: CookieService,
    private _CartService: CartService,
    private _AlertServiceService: AlertServiceService
  ) {}

  isLoading: boolean = false;
  errorMessage: string = '';
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!#%*?&])[A-Za-z\d@$!#%*?&]{8,16}$/
      ),
    ]),
  });

  submitLoginForm(logForm: FormGroup) {
    this.isLoading = true;
    this._AuthService.signIn(logForm.value).subscribe({
      next: (data) => {
        if (data.message == 'success') {
          this._CartService.getLoggedUserCart().subscribe({
            next: (res) => {
              // this._CartService.numOfCartItems.subscribe(()=>{
              this._CartService.numOfCartItems.next(res.numOfCartItems);
              // }) ;
            },
            error: (err) => {
              this._CartService.numOfCartItems.next(0);
            },
          });
          this.isLoading = false;
          this._CookieService.set('userToken', data.token, 30, '/');
          this._AuthService.saveData();
          this._Router.navigate(['/home']);
        }
      },

      error: (err) => {
        this.errorMessage = err.error.message;
        this._AlertServiceService.errorNotification(this.errorMessage);
        this.isLoading = false;

        setTimeout(() => {
          $('.alreadyExist').fadeOut(1000);
        }, 10000);
      },
    });
  }
}
