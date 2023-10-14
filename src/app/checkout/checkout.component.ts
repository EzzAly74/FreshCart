import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../order.service';
import { CartService } from '../cart.service';
import { AlertServiceService } from '../alert-service.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent {
  imgSrc: string = '../../assets/images/checkmark.webp';
  cartId!: string;
  isLoadCash: boolean = false;
  isLoadOnline: boolean = false;
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _OrderService: OrderService,
    private _CartService: CartService,
    private _Router: Router,
    private _AlertServiceService: AlertServiceService
  ) {}
  checkoutForm: FormGroup = new FormGroup({
    details: new FormControl(null),
    phone: new FormControl(null),
    city: new FormControl(null),
  });

  ngOnInit(): void {
    this.cartId = this._ActivatedRoute.snapshot.params['id'];
  }
  submitCheckoutFormOnline(formGroup: FormGroup) {
    this.isLoadOnline = true;
    this._OrderService
      .createOnlineOrder(this.cartId, formGroup.value)
      .subscribe({
        next: (res) => {
          console.log(res);
          this._CartService.numOfCartItems.next(0);
          this.isLoadOnline = false;
          window.location.href = res.session.url;
          this._Router.navigate(['/home']);
        },
        error: (err) => {
          this.isLoadOnline = false;
          console.log(err);
        },
      });
  }
  submitCheckoutFormCash(formGroup: FormGroup) {
    this.isLoadCash = true;
    this._OrderService.createCashOrder(this.cartId, formGroup.value).subscribe({
      next: (res) => {
        this.isLoadCash = false;
        this._CartService.numOfCartItems.next(0);
        this._AlertServiceService.successNotificationPayment();

        // document.querySelector('.okMessage')?.addEventListener('click', () => {
        //   this._Router.navigate(['/home']);
        // });
        console.log(res);
      },
      error: (err) => {
        this.isLoadCash = false;
        console.log(err);
      },
    });
  }
}
