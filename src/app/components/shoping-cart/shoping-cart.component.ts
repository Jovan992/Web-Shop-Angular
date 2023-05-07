import { Component, Input, OnInit } from '@angular/core';
import { ShopService } from 'src/app/services/shop.service';
import { Cart } from '../models/Cart';

@Component({
  selector: 'app-shoping-cart',
  templateUrl: './shoping-cart.component.html',
  styleUrls: ['./shoping-cart.component.css']
})
export class ShopingCartComponent implements OnInit {

  @Input() kolica: Cart[] = this._shopService.kolica;
  @Input() subtotal: number = 0;
  @Input() shipping: any;
  @Input() total: number;

  @Input() cartLength = this.kolica.length;

  refreshSum() {
    this.subtotal = 0;
    for (var order of this.kolica) {
      this.subtotal += order.quantity * order.productPrice
    }

    if (this.subtotal < 100) {
      this.shipping = 100;
      this.total = this.subtotal + this.shipping
    } else {
      this.shipping = "FREE";
      this.total = this.subtotal;
    }

  }

  refreshCartLength() {
    this.cartLength = this.kolica.length;
  }


  remove(prodName: string) {
    let id = this.kolica.findIndex(x => x.productName == prodName)
    this.kolica.splice(id, 1);
    this.refreshSum();
    this.refreshCartLength()
  }


  ngOnInit(): void {
    this.refreshSum();
  }


  constructor(
    private _shopService: ShopService
  ) { }

}
