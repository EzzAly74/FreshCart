import { AllCartData } from './../all-cart-data';
import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CartService } from '../cart.service';
import { AuthService } from '../auth.service';
import { AlertServiceService } from '../alert-service.service';

declare var $: any;
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  res!: string;
  cartId!: string;
  isLoading: boolean = false;
  deleteLoad: boolean = false;
  cartFlag: boolean = false;
  cartData!: AllCartData;

  constructor(
    private _CookieService: CookieService,
    private _CartService: CartService,
    private _AuthService: AuthService,
    private _AlertServiceService: AlertServiceService
  ) {}

  ngOnInit(): void {
    this._CartService.numOfCartItems.subscribe({
      next: () => {
        this._CartService.numOfCartItems.subscribe({
          next: () => {
            this.res = this._CartService.numOfCartItems.getValue();
          },
        });
      },
    });

    this._CookieService.set('currentPage', '/cart');

    this.getAllCartItems();
  }

  getAllCartItems() {
    this._CartService.getLoggedUserCart().subscribe({
      next: (res) => {
        this.cartId = res.data._id;
        this.cartData = res.data;
        $('.layer').fadeOut(500);
        console.log(res.data);

        if (res.numOfCartItems < 1) {
          this.cartFlag = false;
        } else {
          this.cartFlag = true;
        }
      },
      error: (err) => {
        if (err.error.message.includes('No cart exist for this user')) {
          this.cartFlag = false;
        }
        console.log(err);
        $('.layer').fadeOut(500);
      },
    });
  }
  twoWords(s: string) {
    return s.split(' ').slice(0, 2).join(' ');
  }

  deleteItem(pID: string, index: number) {
    let x = () => {
      let allRemove = document.querySelectorAll('.remove .removeIcon');
      let minusAll = document.querySelectorAll('.minus .minusIcon');

      for (let i = 0; i < allRemove.length; i++) {
        if (index == i) {
          allRemove[i].classList.remove('fa-trash-can');
          allRemove[i].classList.add('fa-spinner', 'fa-spin');
        }
      }
      for (let i = 0; i < minusAll.length; i++) {
        if (i == index) {
          minusAll[i].classList.remove('fa-minus');
          minusAll[i].classList.add('fa-spinner', 'fa-spin');
        }
      }
      this.deleteLoad = true;
      this._CartService.removeCartItem(pID).subscribe({
        next: (res) => {
          for (let i = 0; i < this.cartData.products.length; i++) {
            if (index == i) {
              this._AlertServiceService.deleteNotification(
                this.twoWords(this.cartData.products[i].product.title)
              );
            }
          }
          this.cartData = res.data;
          console.log(res.numOfCartItems);

          if (res.numOfCartItems > 0) {
            // this._CartService.numOfCartItems.subscribe( ()=>{
            this._CartService.numOfCartItems.next(res.numOfCartItems);
            // }
            // )
          } else {
            this._CartService.numOfCartItems.next(0);
            this.cartFlag = false;
          }
          this.deleteLoad = false;
        },
        error: (err) => {
          console.log(err);
          this.deleteLoad = false;
        },
      });
    };
    this._AlertServiceService.confirmDeleteNotification(x);
  }
  updateCount(pid: string, c: number, oldCount: number, index: number) {
    if (c == 0) {
      this.deleteItem(pid, index);
      return;
    }
    let plusAll = document.querySelectorAll('.plus .plusIcon');
    let minusAll = document.querySelectorAll('.minus .minusIcon');
    for (let i = 0; i < plusAll.length; i++) {
      if (i == index && oldCount < c) {
        plusAll[i].classList.remove('fa-plus');
        plusAll[i].classList.add('fa-spinner', 'fa-spin');
      }
    }

    for (let i = 0; i < minusAll.length; i++) {
      if (i == index && oldCount > c) {
        minusAll[i].classList.remove('fa-minus');
        minusAll[i].classList.add('fa-spinner', 'fa-spin');
      }
    }

    this._CartService.updateCartProductQuantity(pid, c).subscribe({
      next: (res) => {
        this.cartData = res.data;
      },
      error: () => {},
    });
  }

  removeCart() {
    let x = () => {
      this.isLoading = true;
      this._CartService.clearCart().subscribe({
        next: (res) => {
          console.log(res);
          this.cartFlag = false;
          this._AlertServiceService.deleteNotification('Your Cart');
          this.cartData.products = [];
          this._CartService.numOfCartItems.next(0);
          this.isLoading = false;
        },
        error: (err) => {
          console.log(err);
          this.isLoading = false;
        },
      });
    };
    this._AlertServiceService.confirmDeleteNotification(x);
  }
}
