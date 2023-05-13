import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from '../../../models/Product';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  listOfProducts: Product[] = [];
  currentCat: string;

  constructor(
    private _route: ActivatedRoute,
    public productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this.currentCat = this.productsService.currentCategory = this._route.snapshot.params['category'];
    this.getProductsByCatId();
    this._route.params.subscribe(
      (params: Params) => {
        this.productsService.currentCategory = this.currentCat = params['category'];
        this.getProductsByCatId();
      }
    )
  };

  getProductsByCatId() {
    this.listOfProducts = this.productsService.getProductsByCategory(this.currentCat);
  }
}
