import { Component, Input, OnInit } from '@angular/core';
import { ShopService } from 'src/app/services/shop.service';
import { orderedItem } from '../../models/orderedItem';

@Component({
  selector: 'app-shoping-cart',
  templateUrl: './shoping-cart.component.html',
  styleUrls: ['./shoping-cart.component.css']
})
export class ShopingCartComponent implements OnInit {

  kolica: orderedItem[];
  subtotal: number = 0;
  shipping: any;
  total: number;
  showCart: boolean;

  constructor(
    private _shopService: ShopService
  ) { }

  ngOnInit(): void {
    this.kolica = this._shopService.orderedItems;
    this.refreshSum();
    this.preuzmiOrdere();
  }

  refreshSum() {
    this.subtotal = 0;
    if (this.kolica.length > 0) {
        this.showCart = true;
      for (var order of this.kolica) {
        this.subtotal += order.quantity * order.productPrice
      }
    } else {
      this.showCart = false;
    }

    if (this.subtotal < 100) {
      this.shipping = 100;
      this.total = this.subtotal + this.shipping
    } else {
      this.shipping = "FREE";
      this.total = this.subtotal;
    }
  }

  remove(prodId: number) {
    let index = this.kolica.findIndex(x => x.id == prodId)
    this.kolica.splice(index, 1);
    this._shopService.deleteProduct(prodId).subscribe({
      next: (data) => {
        console.log(data);
      }
    });
    this.refreshSum();
    this.preuzmiOrdere();
    this._shopService.currentNumberOfProducts = this.calcNumber();
    this._shopService.shopingCartNumberChanged.next(this._shopService.currentNumberOfProducts);
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
    if (index !== -1) {
      this._shopService.currentNumberOfProducts = this.calcNumber();
      this._shopService.shopingCartNumberChanged.next(this._shopService.currentNumberOfProducts);
      this._shopService.orderedItems[index] = newItem;
      this._shopService.izmeniUKolicima(newItem).subscribe({
        next: (response) => { console.log(response) },
        error: (error) => { console.log(error) }
      });
    }
    this.preuzmiOrdere();
  }

  calcNumber(): number {
    let sum: number = 0;
      this.kolica.forEach(item => {
        sum += item.quantity;
      });
      return sum;
  }
}
