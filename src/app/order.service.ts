import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  baseUrl: string = 'https://ecommerce.routemisr.com';

  constructor(private _HttpClient: HttpClient) {}
  createCashOrder(cId: string, formValue: any): Observable<any> {
    let body = {
      shippingAddress: formValue,
    };
    return this._HttpClient.post(`${this.baseUrl}/api/v1/orders/${cId}`, body);
  }

  createOnlineOrder(cId: string, formValue: any): Observable<any> {
    let body = {
      shippingAddress: formValue,
    };
    return this._HttpClient.post(
      `${this.baseUrl}/api/v1/orders/checkout-session/${cId}?url=https://ezzaly74.github.io/FreshCart/home`,
      body
    );
  }
  getUserOrders(userId: string): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/api/v1/orders/user/${userId}`);
  }
}
