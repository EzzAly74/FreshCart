import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { AlertServiceService } from '../alert-service.service';

declare var $: any;

AuthService;
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {
  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
    private _AlertServiceService: AlertServiceService
  ) {}
  ngOnInit(): void {
    document.querySelector('footer')?.classList.add('fixed-bottom');
  }
  ngOnDestroy(): void {
    document.querySelector('footer')?.classList.remove('fixed-bottom');
  }
  isLoading: boolean = false;
  errorMessage: string = '';
  forgetPassForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  });

  submitForgetForm(forPassForm: FormGroup) {
    this.isLoading = true;
    let html = "<span id='okMessageForgot'>Ok</span>";
    this._AuthService.forgotPass(forPassForm.value).subscribe({
      next: (res) => {
        this._AlertServiceService.successNotificationCode(
          'Code sent to your Email',
          () => {
            this._Router.navigate(['/resetcode']);
          }
        );

        console.log(res);

        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this._AlertServiceService.errorNotification(this.errorMessage);
        this.isLoading = false;

        setTimeout(() => {
          $('.alreadyExist').fadeOut(1000);
        }, 5000);
      },
    });
  }
}
