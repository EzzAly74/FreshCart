import { Component, Input } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { WishlistService } from './../wishlist.service';
import { ProductsService } from '../products.service';
import { product } from '../allproducts';
import { CartService } from '../cart.service';
import { AuthService } from '../auth.service';
import { AlertServiceService } from '../alert-service.service';
declare var $: any;

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  @Input() searchRes: string = '';
  load: boolean = false;
  wishlistArr: string[] = [];
  userMessage!: string;
  userMessageWishlist!: string;
  userMessageWishlistRemoved!: string;
  constructor(
    private _CookieService: CookieService,
    private _ProductsService: ProductsService,
    private _CartService: CartService,
    private _AuthService: AuthService,
    private _WishlistService: WishlistService,
    private _AlertServiceService: AlertServiceService
  ) {}
  allProducts!: product[];
  ngOnInit(): void {
    this._WishlistService.getLoggedUserWishlist().subscribe({
      next: (res) => {
        // console.log(res.data);
        this.wishlistArr = this.getWishes(res.data);
        console.log(this.wishlistArr);
      },
      error: (err) => {
        console.log(err);
      },
    });
    this._CookieService.set('currentPage', '/products');
    this._CartService.getLoggedUserCart().subscribe({
      next: (res) => {
        this._CartService.numOfCartItems.next(res.numOfCartItems);
      },
    });
    this.getAllProds();
  }

  getAllProds() {
    this._ProductsService.getAllProducts().subscribe({
      next: (res) => {
        this.allProducts = res.data;
        $('.layer').fadeOut(500);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  twoWords(s: string) {
    return s.split(' ').slice(0, 2).join(' ');
  }

  rating(n: number) {
    return n.toFixed(1);
  }

  addToCart(id: string, index: number) {
    let addToCartIcons = document.querySelectorAll('.addToCart .addToCartIcon');
    for (let i = 0; i < addToCartIcons.length; i++) {
      if (i == index) {
        addToCartIcons[i].classList.remove('fa-cart-plus');
        addToCartIcons[i].classList.add('fa-spinner', 'fa-spin');
      }
    }

    this.load = true;
    this._CartService.addToCart(id).subscribe({
      next: (res) => {
        for (let i = 0; i < addToCartIcons.length; i++) {
          if (i == index) {
            addToCartIcons[i].classList.remove('fa-spinner', 'fa-spin');
            addToCartIcons[i].classList.add('fa-square-check');

            setTimeout(() => {
              addToCartIcons[i].classList.remove('fa-square-check');
              addToCartIcons[i].classList.add('fa-cart-shopping');
            }, 1500);
          }
        }
        this.userMessage = res.message;
        for (let i = 0; i < this.allProducts.length; i++) {
          if (i == index) {
            this._AlertServiceService.successNotification(
              this.twoWords(this.allProducts[i].title)
            );
          }
        }

        this._CartService.numOfCartItems.next(res.numOfCartItems);
        setTimeout(() => {
          $('.sendSuccess').fadeOut(500);
        }, 2000);
        this.load = false;
      },
      error: (err) => {
        console.log(err);
        this.load = false;
      },
    });
  }

  addToWishlist(pId: string, index: number) {
    let wishlistIcons = document.querySelectorAll('.wishlistIcon');
    let wishlistIcon = wishlistIcons[index];
    if (wishlistIcon.classList.contains('wishlistImg')) {
      wishlistIcon.classList.remove('fa-regular');
      wishlistIcon.classList.add('fa-solid', 'bg-heart');
    }
    this._WishlistService.addProductToWishlist(pId).subscribe({
      next: (res) => {
        console.log(res);
        this.wishlistArr = res.data;
        this.userMessageWishlist = res.message;
        this._AlertServiceService.toastSuccess();

        setTimeout(() => {
          $('.addedWishlist').fadeOut(500);
        }, 2000);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getWishes(arr: any[]): string[] {
    let ary: string[] = [];
    for (let i = 0; i < arr.length; i++) {
      ary.push(arr[i]._id);
    }
    return ary;
  }

  removeFromWishlist(pId: string, index: number) {
    let wishlistIcons = document.querySelectorAll('.wishlistIcon');
    let wishlistIcon = wishlistIcons[index];
    if (wishlistIcon.classList.contains('removeFromWishlist')) {
      wishlistIcon.classList.remove('fa-solid', 'bg-heart');
      wishlistIcon.classList.add('fa-regular');
    }
    this._WishlistService.removeProductFromWishlist(pId).subscribe({
      next: (res) => {
        this._AlertServiceService.toastRemove();
        console.log(res);
        this.wishlistArr = res.data;
        this.userMessageWishlistRemoved = res.message;

        setTimeout(() => {
          $('.removedWishlist').fadeOut(500);
        }, 2000);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  filterProducts(arr: any[], s: string) {
    return arr.filter((e) => e.title.toLowerCase().includes(s.toLowerCase()));
  }
}
