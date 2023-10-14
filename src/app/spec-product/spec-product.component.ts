import { Specproductdata } from './../specproductdata';
import { Component } from '@angular/core';
import { ProductsService } from '../products.service';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../cart.service';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../auth.service';
import { AlertServiceService } from '../alert-service.service';
AlertServiceService;
declare var $: any;
@Component({
  selector: 'app-spec-product',
  templateUrl: './spec-product.component.html',
  styleUrls: ['./spec-product.component.css'],
})
export class SpecProductComponent {
  load: boolean = false;
  userMessage!: string;
  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['<', '>'],
    responsive: {
      0: {
        items: 1,
      },
    },
  };

  productData!: Specproductdata;
  id!: string;
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _ProductsService: ProductsService,
    private _CartService: CartService,
    private _CookieService: CookieService,
    private _AuthService: AuthService,
    private _AlertServiceService: AlertServiceService
  ) {}
  ngOnInit(): void {
    this.id = this._ActivatedRoute.snapshot.params['id'];

    this.getSpec();
  }

  getSpec() {
    this._ProductsService.getSpecProduct(this.id).subscribe({
      next: (res) => {
        this.productData = res.data;
        $('.layer').fadeOut(500);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  rating(n: number) {
    return n.toFixed(1);
  }
  addToCart(id: string) {
    this.load = true;
    this._CartService.addToCart(id).subscribe({
      next: (res) => {
        this.userMessage = res.message;
        this._CartService.numOfCartItems.next(res.numOfCartItems);

        this._AlertServiceService.successNotification(
          this.twoWords(this.productData.title)
        );
        console.log(res);
        this.load = false;
      },
      error: (err) => {
        console.log(err);
        this.load = false;
      },
    });
  }
  twoWords(s: string) {
    return s.split(' ').slice(0, 2).join(' ');
  }
}
