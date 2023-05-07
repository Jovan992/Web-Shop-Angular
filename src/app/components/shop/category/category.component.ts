import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from '../../../models/Product';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  listOfProducts: Product[] = [];
  currentCat = this.productService.currentCategory;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private productService: ProductsService
  ) { }

  ngOnInit(): void {
    this.currentCat = this._route.snapshot.params['category']
    this.getProductsByCatId();

    this._route.params.subscribe({
      next: (data: any) => {
        this.currentCat = data.category;
        this.getProductsByCatId();
      },
      error: (err) => console.log(err)
    });
  }

  getProductsByCatId() {
    this.listOfProducts = this.productService.getProductsByCategory(this.currentCat);
  }
  
  navigateToProduct(id: number) {
    this.productService.navigateToProduct2(id);
  }
}
