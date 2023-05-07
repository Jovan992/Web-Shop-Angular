import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ShopComponent } from './components/shop/shop.component';
import { CategoryComponent } from './components/shop/category/category.component';
import { ProductComponent } from './components/shop/category/product/product.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ShopingCartComponent } from './components/shoping-cart/shoping-cart.component';
import { ProductOrderComponent } from './components/product-order/product-order.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: "shop", component: ShopComponent, children: [
      {
        path: ":category", component: CategoryComponent
      }]
  },
  { path: "product/:id", component: ProductComponent },
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent },
  { path: "cart", component: ShopingCartComponent },
  { path: "productOrder", component: ProductOrderComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
