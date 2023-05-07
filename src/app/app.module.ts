import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SocialSidebarComponent } from './components/social-sidebar/social-sidebar.component';
import { ShopComponent } from './components/shop/shop.component';
import { CategoryComponent } from './components/shop/category/category.component';
import { ProductComponent } from './components/shop/category/product/product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ShopingCartComponent } from './components/shoping-cart/shoping-cart.component';
import { ProductOrderComponent } from './components/product-order/product-order.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    SocialSidebarComponent,
    ShopComponent,
    CategoryComponent,
    ProductComponent,
    LoginComponent,
    SignupComponent,
    ShopingCartComponent,
    ProductOrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
