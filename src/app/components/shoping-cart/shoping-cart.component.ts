import { Component, Input, OnInit } from '@angular/core';
import { ShopService } from 'src/app/services/shop.service';
import { orderedItem } from '../../models/orderedItem';

@Component({
  selector: 'app-shoping-cart',
  templateUrl: './shoping-cart.component.html',
  styleUrls: ['./shoping-cart.component.css']
})
export class ShopingCartComponent implements OnInit {

  @Input() kolica: orderedItem[];
  @Input() subtotal: number = 0;
  @Input() shipping: any;
  @Input() total: number;
  @Input() cartLength: number;

  constructor(
    private _shopService: ShopService
  ) { }

  ngOnInit(): void {
    this.kolica = this._shopService.orderedItems;
    this.cartLength = this.kolica.length;
    this.refreshSum();
    this.preuzmiOrdere();
  }

  refreshSum() {
    this.subtotal = 0;
    if (this.cartLength > 0) {
      for (var order of this.kolica) {
        this.subtotal += order.quantity * order.productPrice
      }
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
    this.refreshCartLength();
    this.preuzmiOrdere();
  }

  preuzmiOrdere() {
    this._shopService.preuzmiOrdere().subscribe({
      next: (orderi) => { console.log(orderi) },
      error: (err) => { console.log(err) }
    })
  }

  editOrderedItem(order: orderedItem) {
    let newItem: orderedItem = {
      productName: order.productName,
      id: order.id,
      quantity: order.quantity,
      productPrice: order.productPrice,
      imgSrc: order.imgSrc
    };
    let index = this.kolica.findIndex(function (o) { return o.productName == newItem.productName });
    if (index != -1) {
      // this.kolica[index] = newItem;
      this._shopService.orderedItems[index] = newItem;

      this._shopService.izmeniUKolicima(newItem).subscribe({
        next: (response) => { console.log("editovan " + newItem.productName + ", novi quantity: " + newItem.quantity) },
        error: (error) => { console.log(error) }
      })
    }
    this.preuzmiOrdere();
  }
}
