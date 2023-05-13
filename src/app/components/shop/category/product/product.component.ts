import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { ProductsService } from 'src/app/services/products.service';
import { ShopService } from 'src/app/services/shop.service';
import { orderedItem } from 'src/app/models/orderedItem';
import { AuthService } from 'src/app/services/auth.service';
declare var $: any;

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  currentProduct: Product;
  listOfProducts: Product[] = [];
  orderedItems: orderedItem[] = [];
  item: orderedItem;

  constructor(
    private route: ActivatedRoute,
    private shopService: ShopService,
    private productsService: ProductsService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.getOrderedItems();
    this.listOfProducts = this.productsService.listOfProducts;
    this.currentProduct = this.productsService.getProductById(this.route.snapshot.params['id']);
    this.productsService.currentCategory = this.currentProduct.category;
    this.route.params.subscribe(
      (params: Params) => {
        this.currentProduct = this.productsService.getProductById(params['id']);
        this.productsService.currentCategory = this.currentProduct.category;
      }
    )
  }

  prev(): void {
    let index = this.listOfProducts.findIndex(x => x.id == this.currentProduct.id);
    if (index !== -1) {
      if (index == 0) {
        let newIndex = this.listOfProducts.length - 1;
        this.productsService.navigateToProduct(this.productsService.listOfProducts[newIndex].id)
      }
      else {
        let newIndex = index - 1;
        this.productsService.navigateToProduct(this.productsService.listOfProducts[newIndex].id)
      }
    }
  }

  next(): void {
    let index = this.listOfProducts.findIndex(x => x.id == this.currentProduct.id);
    if (index !== -1) {
      if (index == this.listOfProducts.length - 1) {
        this.productsService.navigateToProduct(this.productsService.listOfProducts[0].id)
      }
      else {
        let newIndex = index + 1;
        this.productsService.navigateToProduct(this.productsService.listOfProducts[newIndex].id)
      }
    }
  }

  addToCart(productName: string, quantityString: string, cenaProizvoda: number, imgSrc: string, productId: number) {
    let quantityNumber = parseInt(quantityString);
    if (quantityNumber > 0) {
      if (this.authService.isLoggedIn) {
        let index = this.orderedItems.findIndex(x => x.id == productId);
        if (index !== -1) {
          let orderedItem: orderedItem = {
            id: productId,
            productName: productName,
            quantity: this.orderedItems[index].quantity + quantityNumber,
            productPrice: cenaProizvoda,
            imgSrc: imgSrc
          }
          this.item = orderedItem;
          this.shopService.izmeniUKolicima(this.item);
          this.orderedItems[index] = this.item;
        } else {
          let orderedItem: orderedItem = {
            id: productId,
            productName: productName,
            quantity: quantityNumber,
            productPrice: cenaProizvoda,
            imgSrc: imgSrc
          }
          this.item = orderedItem;
          this.orderedItems.push(this.item);
          this.shopService.orderedItems = this.orderedItems;
          this.shopService.dodajUKolica(this.item).subscribe({
            next: (response) => { console.log(response) },
            error: (error) => { console.log(error) }
          })
        }
        let indexN = this.orderedItems.findIndex(x => x.id == this.item.id);
        this.shopService.currentNumberOfProducts = this.shopService.currentNumberOfProducts + quantityNumber;
        this.shopService.shopingCartNumberChanged.next(this.shopService.currentNumberOfProducts);
      } else {
        $("#cartModal").modal('show');
      }

    }
    else {
      alert("Please type in desired quantity");
    }
  }

  getOrderedItems() {
    this.shopService.preuzmiOrdere().subscribe({
      next: (orderedItems) => {
        this.orderedItems = orderedItems as orderedItem[];
        this.shopService.orderedItems = this.orderedItems;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}

