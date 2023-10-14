import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { AlertServiceService } from '../alert-service.service';

declare var $: any;

@Component({
  selector: 'app-set-new-pass',
  templateUrl: './set-new-pass.component.html',
  styleUrls: ['./set-new-pass.component.css'],
})
export class SetNewPassComponent {
  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
    private _AlertServiceService: AlertServiceService
  ) {}
  isLoading: boolean = false;
  errorMessage: string = '';
  setNewPass: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    newPassword: new FormControl(null, [
      Validators.required,
      Validators.pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!#%*?&])[A-Za-z\d@$!#%*?&]{8,16}$/
      ),
    ]),
  });

  submitSetNewPass(setnew: FormGroup) {
    this.isLoading = true;
    this._AuthService.resetPass(setnew.value).subscribe({
      next: (res) => {
        this._AlertServiceService.successNotificationCodeNewpass(
          'Password reset Successfully',
          () => {
            this._Router.navigate(['/login']);
          }
        );
        document;
        console.log(res);

        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this._AlertServiceService.errorNotification(this.errorMessage);

        this.isLoading = false;
      },
    });
  }
}
