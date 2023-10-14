import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Injectable({
  providedIn: 'root',
})
export class AlertServiceService {
  constructor(private _Router: Router) {}
  successNotification(title: string) {
    Swal.fire({
      title: `${title} Added Successfully to Your Cart`,
      text: 'Success',
      icon: 'success',
      confirmButtonText:
        'Back to Shop <i class="fa-solid fa-shopping-cart"></i>',
    });
  }
  successNotificationPayment() {
    Swal.fire({
      title: `Success`,
      timer: 2000,
      icon: 'success',
      showConfirmButton: false,
    }).then((okay) => {
      if (okay) {
        this._Router.navigate(['/home']);
      }
    });
  }
  toastSuccess() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: 'success',
      title: 'Added to Wishlist Successfully',
    });
  }

  toastRemove() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: 'error',
      title: 'Removed From Wishlist',
    });
  }

  confirmDeleteNotification(fun: Function) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        // Swal.fire('Deleted!', `${title} has been deleted.`, 'success');
        fun();
      }
    });
  }

  deleteNotification(title: string) {
    Swal.fire('Deleted!', `${title} has been deleted.`, 'error');
  }

  errorNotification(title: string) {
    Swal.fire('Fail', `${title}`, 'error');
  }

  successNotificationCode(title: string, fun: Function) {
    Swal.fire({
      title: `${title}`,
      text: 'Success',
      icon: 'success',
    }).then(fun());
  }

  successNotificationCodeNewpass(title: string, fun: Function) {
    Swal.fire({
      title: `${title}`,
      text: 'Success',
      icon: 'success',
    }).then(fun());
  }
}
