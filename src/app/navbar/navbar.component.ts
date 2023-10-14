import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { CookieService } from 'ngx-cookie-service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  totalItems: number = 0;
  constructor(
    private _AuthService: AuthService,
    private _CookieService: CookieService,
    private _Router: Router,
    private _CartService: CartService
  ) {}
  userName: string = '';
  isLogin: boolean = false;
  ngOnInit(): void {
    this._CartService.numOfCartItems.subscribe({
      next: () => {
        this.totalItems = this._CartService.numOfCartItems.getValue();
      },
    });

    this._AuthService.userSharedData.subscribe(() => {
      if (this._AuthService.userSharedData.getValue() == null) {
        this.isLogin = false;
      } else {
        this.isLogin = true;
        let userData: any = this._AuthService.userSharedData.getValue();
        this.userName = userData.name;
      }
    });
  }

  logout() {
    this._CookieService.deleteAll('/');
    this._CookieService.delete('currentPage');
    this._AuthService.saveData();
    this.isLogin = false;
    this._Router.navigate(['/login']);
  }
}
