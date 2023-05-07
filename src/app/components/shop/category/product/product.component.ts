import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { ProductsService } from 'src/app/services/products.service';
import { ShopService } from 'src/app/services/shop.service';
import { orderedItem } from 'src/app/models/orderedItem';
import { AuthService } from 'src/app/services/auth.service';
import { debounce } from 'rxjs';
declare var $: any;

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  // currentProductId: number;
  currentProduct: Product;
  listOfProducts: Product[];
  orderedItems: orderedItem[] = [];
  item: orderedItem;

  @ViewChild('quantityForm') quantityForm: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private shopService: ShopService,
    private productsService: ProductsService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.getOrderedItems();
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
    let quantityNumber = parseInt(quantityString);
    if (quantityNumber > 0) {

      if (this.authService.isLoggedIn) {


        let index = this.orderedItems.findIndex(x => x.productName == productName);

        if (index !== -1) {
          let orderedItem: orderedItem = {
            id: index + 1,
            productName: productName,
            quantity: this.orderedItems[index].quantity + quantityNumber,
            productPrice: cenaProizvoda,
            imgSrc: imgSrc
          }
          this.item = orderedItem;

        } else {
          let orderedItem: orderedItem = {
            id: this.orderedItems.length + 1,
            productName: productName,
            quantity: quantityNumber,
            productPrice: cenaProizvoda,
            imgSrc: imgSrc
          }
          this.item = orderedItem;
        }
        this.orderedItems.push(this.item);
        this.shopService.orderedItems = this.orderedItems;
        this.shopService.dodajUKolica(this.item).subscribe({
          next: (response) => { console.log(response) },
          error: (error) => { console.log(error) }
        })

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

