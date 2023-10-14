import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BrandsService {
  baseUrl: string = 'https://ecommerce.routemisr.com';

  constructor(private _HttpClient: HttpClient) {}

  getAllBrands(): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/api/v1/brands`);
  }
  getSpecBrand(pId: string): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/api/v1/brands/${pId}`);
  }
}
