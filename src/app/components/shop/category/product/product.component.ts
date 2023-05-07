import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Product } from 'src/app/components/models/Product';
import { ProductsService } from 'src/app/services/products.service';
import { ShopService } from 'src/app/services/shop.service';
import { Cart } from 'src/app/components/models/Cart';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  currentProductId: number;
  currentProduct: Product;
  listOfProducts: Product[] = this.productsService.listOfProducts;
  kolica: Cart[] = this.shopService.kolica;

  @ViewChild('quantityForm') quantityForm: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private shopService: ShopService,
    private productsService: ProductsService
  ) { }
  

  ngOnInit(): void {
    this.currentProduct = this.productsService.getProductById(this.route.snapshot.params['id']);
    this.route.params.subscribe(
      (params: Params) => {
        this.currentProduct = this.productsService.getProductById(params['id'])
      }
    )
  }

  

  prev(): void {
    let index = this.listOfProducts.findIndex(x => x.id == this.currentProduct.id);
    if (index != -1) {
      if (index == 0) {
        let newIndex = this.listOfProducts.length - 1;
        this.productsService.navigateToProduct2(this.productsService.listOfProducts[newIndex].id)
      } else {
        let newIndex = index - 1;
        this.productsService.navigateToProduct2(this.productsService.listOfProducts[newIndex].id)
      }
      console.log("List of products is empty")
    }
    else {
      index = this.listOfProducts.length - 1;
      this.productsService.navigateToProduct2(this.productsService.listOfProducts[0].id)
    }
  }

  next() {
    let brojac: number;
    brojac = this.currentProduct.id;
    if (brojac < this.productsService.listOfProducts.length) {
      brojac = ++brojac;
      this.productsService.navigateToProduct2(brojac);
    }
    else {
      this.productsService.navigateToProduct2(this.productsService.listOfProducts[0].id)
    }
  }

  addToCart(productName: string, quantityString: string, cenaProizvoda: number, imgSrc: string) {
    console.log(this.shopService.kolica.length)
    console.log(this.shopService.kolica)

    let quantityNumber = parseInt(quantityString);
    if (quantityNumber > 0) {

      let item = this.kolica.find(x => x.productName == productName);
      if (item?.productName) {
        item.quantity += quantityNumber;
      } else {
        this.shopService.kolica.push({
          productName: productName,
          quantity: quantityNumber,
          productPrice: cenaProizvoda,
          imgSrc: imgSrc
        });
      }
      this.quantityForm.nativeElement.reset();
    }

    else {
      alert("Please type in desired quantity");
    }
  }
}

