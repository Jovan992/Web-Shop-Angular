import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OnInit } from '@angular/core';
import { ShopService } from 'src/app/services/shop.service';


@Component({
  selector: 'app-product-order',
  templateUrl: './product-order.component.html',
  styleUrls: ['./product-order.component.css']
})
export class ProductOrderComponent implements OnInit {



orderForm: FormGroup

onSubmit(){
  if(this.orderForm.valid){

    // prebaci metode prev i next i ostalo u prod service
    this._shopService.kolica = [];
    console.log(this.orderForm)
    console.log("Forma je validna.")

  }
  else{
    console.log(this.orderForm)

    console.log("Forma nije validna.")
  }
}

constructor(
  private _shopService: ShopService
){}

ngOnInit(): void {
  this.orderForm = new FormGroup({
    'firstName' : new FormControl('', [Validators.minLength(5),  Validators.required]), 
    'lastName' : new FormControl('', [Validators.minLength(5), Validators.required]), 
    'email' : new FormControl(null,[Validators.required, Validators.email]),
    'tel' : new FormControl('', [Validators.required, Validators.pattern('[0-9]{9,10}')]),
    'address' : new FormControl('', [Validators.minLength(5),  Validators.required]),
    'comment' : new FormControl(''),
    'paymentMethod' : new FormControl('Credit card'),
  });
}

}

