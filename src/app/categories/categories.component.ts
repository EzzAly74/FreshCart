import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CategoriesService } from '../categories.service';

declare var $: any;

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent {
  allCategories!: any;
  constructor(
    private _CookieService: CookieService,
    private _CategoriesService: CategoriesService
  ) {}
  ngOnInit(): void {
    this._CookieService.set('currentPage', '/categories');

    this._CategoriesService.getAllCategories().subscribe({
      next: (res) => {
        console.log(res.data);
        $('.layer').fadeOut(500);
        this.allCategories = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
