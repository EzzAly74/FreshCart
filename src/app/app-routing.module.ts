import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BrandsComponent } from './brands/brands.component';
import { CartComponent } from './cart/cart.component';
import { CategoriesComponent } from './categories/categories.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProductsComponent } from './products/products.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetCodeComponent } from './reset-code/reset-code.component';
import { SetNewPassComponent } from './set-new-pass/set-new-pass.component';
import { authGuard } from './auth.guard';
import { SpecProductComponent } from './spec-product/spec-product.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CheckoutComponent } from './checkout/checkout.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login',
  },
  {
    path: 'home',
    canActivate: [authGuard],
    component: HomeComponent,
    title: 'Home',
  },
  {
    path: 'checkout/:id',
    canActivate: [authGuard],
    component: CheckoutComponent,
    title: 'Checkout',
  },
  {
    path: 'brands',
    canActivate: [authGuard],
    component: BrandsComponent,
    title: 'Brands',
  },
  {
    path: 'cart',
    canActivate: [authGuard],
    component: CartComponent,
    title: 'Cart',
  },
  {
    path: 'categories',
    canActivate: [authGuard],
    component: CategoriesComponent,
    title: 'Categories',
  },
  {
    path: 'productDetails/:id',
    canActivate: [authGuard],
    component: SpecProductComponent,
    title: 'Product Details',
  },
  {
    path: 'register',
    // canActivate: [authGuard],
    component: RegisterComponent,
    title: 'Register',
  },
  {
    path: 'products',
    canActivate: [authGuard],
    component: ProductsComponent,
    title: 'Products',
  },
  {
    path: 'wishlist',
    canActivate: [authGuard],
    component: WishlistComponent,
    title: 'Wishlist',
  },
  {
    path: 'forgotpass',
    component: ForgotPasswordComponent,
    title: 'forgot password',
  },
  {
    path: 'resetcode',
    component: ResetCodeComponent,
    title: 'reset code',
  },
  {
    path: 'setnewpass',
    component: SetNewPassComponent,
    title: 'set new password',
  },

  { path: '**', component: NotfoundComponent, title: '404 NotFound' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
