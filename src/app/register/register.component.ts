import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { AlertServiceService } from '../alert-service.service';

declare var $: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
    private _AlertServiceService: AlertServiceService
  ) {}

  isLoading: boolean = false;
  errorMessage!: string;
  registerForm: FormGroup = new FormGroup(
    {
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!#%*?&])[A-Za-z\d@$!#%*?&]{8,16}$/
        ),
      ]),
      rePassword: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^(01)[0125][0-9]{8}$/),
      ]),
    },
    this.validatePassword
  );

  submitRegisterForm(regForm: FormGroup) {
    this.isLoading = true;
    this._AuthService.signUp(regForm.value).subscribe({
      next: (data) => {
        this.isLoading = false;
        this._Router.navigate(['/login']);
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this._AlertServiceService.errorNotification(this.errorMessage);

        this.isLoading = false;
      },
    });
  }

  validatePassword(formGroup: any) {
    if (formGroup.get('password')?.value === formGroup.get('rePassword')?.value)
      return null;
    else return { mismatch: true };
  }
}
