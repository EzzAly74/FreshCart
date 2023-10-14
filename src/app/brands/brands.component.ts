import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BrandsService } from '../brands.service';
declare var $: any;

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css'],
})
export class BrandsComponent {
  allBrands: any;
  constructor(
    private _CookieService: CookieService,
    private _BrandsService: BrandsService
  ) {}
  ngOnInit(): void {
    this._CookieService.set('currentPage', '/brands');

    this._BrandsService.getAllBrands().subscribe({
      next: (res) => {
        console.log(res);
        $('.layer').fadeOut(500);
        this.allBrands = res.data;
      },
    });
  }
}
