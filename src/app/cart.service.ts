import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  baseUrl: string = 'https://ecommerce.routemisr.com';

  numOfCartItems: BehaviorSubject<any> = new BehaviorSubject(0);
  constructor(
    private _HttpClient: HttpClient,
    private _CookieService: CookieService,
    private _AuthService: AuthService
  ) {
    this.getLoggedUserCart().subscribe((res) => {
      // this.numOfCartItems.subscribe({
      // next:()=>{
      this.numOfCartItems.next(res.numOfCartItems);
      // }
    });
  }

  addToCart(pId: string): Observable<any> {
    let body: any = {
      productId: pId,
    };
    return this._HttpClient.post(`${this.baseUrl}/api/v1/cart`, body);
  }

  updateCartProductQuantity(pID: string, c: number): Observable<any> {
    let body: any = {
      count: c,
    };
    return this._HttpClient.put(`${this.baseUrl}/api/v1/cart/${pID}`, body);
  }

  getLoggedUserCart(): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/api/v1/cart`);
  }

  removeCartItem(pId: string): Observable<any> {
    return this._HttpClient.delete(`${this.baseUrl}/api/v1/cart/${pId}`);
  }

  clearCart(): Observable<any> {
    return this._HttpClient.delete(`${this.baseUrl}/api/v1/cart`);
  }
}
