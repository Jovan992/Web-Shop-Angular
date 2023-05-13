import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OnInit } from '@angular/core';
import { ShopService } from 'src/app/services/shop.service';
import { ProductsService } from 'src/app/services/products.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-product-order',
  templateUrl: './product-order.component.html',
  styleUrls: ['./product-order.component.css']
})
export class ProductOrderComponent implements OnInit {

  orderForm: FormGroup

  constructor(
    private _shopService: ShopService,
    private _router: Router
  ) { }

  onSubmit() {
    if (this.orderForm.valid) {
      this._shopService.isprazniKolica();
      this._shopService.preuzmiOrdere().subscribe({
        next: (data) => {console.log(data)}
      })
      this._shopService.orderedItems = [];
      console.log("Forma je validna.");
      this._router.navigate(['/']);
      // this._shopService.isprazniKolica(this._shopService.orderedItems);

    }
    else {
      this.orderForm.markAllAsTouched();
      console.log("Forma nije validna.")
    }
  }

  ngOnInit(): void {
    this.orderForm = new FormGroup({
      'firstName': new FormControl('', [Validators.minLength(5), Validators.required]),
      'lastName': new FormControl('', [Validators.minLength(5), Validators.required]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'tel': new FormControl('', [Validators.required, Validators.pattern('[0-9]{9,10}')]),
      'address': new FormControl('', [Validators.minLength(5), Validators.required]),
      'comment': new FormControl(''),
      'paymentMethod': new FormControl('Credit card'),
    });
  }
}

