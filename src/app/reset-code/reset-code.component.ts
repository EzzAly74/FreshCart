import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { AlertServiceService } from '../alert-service.service';

declare var $: any;

@Component({
  selector: 'app-reset-code',
  templateUrl: './reset-code.component.html',
  styleUrls: ['./reset-code.component.css'],
})
export class ResetCodeComponent {
  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
    private _AlertServiceService: AlertServiceService
  ) {}
  isLoading: boolean = false;
  errorMessage: string = '';
  resetCodeForm: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [Validators.required]),
  });

  submitResetCodeForm(resCodeForm: FormGroup) {
    this.isLoading = true;
    this._AuthService.resetCode(resCodeForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this._Router.navigate(['/setnewpass']);

        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this._AlertServiceService.errorNotification(this.errorMessage);
        this.isLoading = false;

        console.log(err);
      },
    });
  }
}
