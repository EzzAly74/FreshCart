import { Component } from '@angular/core';
import { WishlistService } from '../wishlist.service';
import { CookieService } from 'ngx-cookie-service';
import { CartService } from '../cart.service';
import { AlertServiceService } from '../alert-service.service';

declare var $: any;

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent {
  allWish: any[] = [];
  constructor(
    private _WishlistService: WishlistService,
    private _CookieService: CookieService,
    private _CartService: CartService,
    private _AlertServiceService: AlertServiceService
  ) {}

  ngOnInit(): void {
    this._CookieService.set('currentPage', '/wishlist');
    this._WishlistService.getLoggedUserWishlist().subscribe({
      next: (res) => {
        console.log(res);
        $('.layer').fadeOut(500);
        this.allWish = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  removeItem(pId: string, index: number) {
    let x = () => {
      let mats = document.querySelectorAll('.mat');
      for (let i = 0; i < mats.length; i++) {
        if (i == index) {
          mats[i].classList.remove('d-none');
        }
      }
      this._WishlistService.removeProductFromWishlist(pId).subscribe({
        next: () => {
          this._WishlistService.getLoggedUserWishlist().subscribe({
            next: (res) => {
              for (let i = 0; i < this.allWish.length; i++) {
                if (index == i) {
                  this._AlertServiceService.deleteNotification(
                    this.twoWords(this.allWish[i].title)
                  );
                }
              }
              mats.forEach((mat) => {
                mat.classList.contains('d-none') == false
                  ? mat.classList.add('d-none')
                  : mat;
              });
              this.allWish = res.data;
            },
          });
        },
        error: (err) => {
          console.log(err);
        },
      });
    };
    this._AlertServiceService.confirmDeleteNotification(x);
  }
  addToCart(pId: string, index: number) {
    let mats = document.querySelectorAll('.mat');
    let cartIcons = document.querySelectorAll('.cartIcon');
    for (let i = 0; i < mats.length; i++) {
      if (i == index) {
        cartIcons[i].classList.remove('fa-cart-plus', 'text-black-50');
        cartIcons[i].classList.add('fa-spinner', 'fa-spin', 'text-main');
      }
    }
    this._CartService.addToCart(pId).subscribe({
      next: (res) => {
        console.log(res);
        this._CartService.numOfCartItems.next(res.numOfCartItems);
        for (let i = 0; i < this.allWish.length; i++) {
          if (i == index) {
            this._AlertServiceService.successNotification(
              this.twoWords(this.allWish[i].title)
            );
          }
        }

        for (let i = 0; i < cartIcons.length; i++) {
          if (i == index) {
            cartIcons[i].classList.remove('fa-spinner', 'fa-spin');
            cartIcons[i].classList.add('fa-circle-check');

            setTimeout(() => {
              cartIcons[i].classList.remove('fa-circle-check', 'text-main');
              cartIcons[i].classList.add('fa-cart-plus');
            }, 1500);
          }
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  twoWords(s: string) {
    return s.split(' ').slice(0, 2).join(' ');
  }
}
