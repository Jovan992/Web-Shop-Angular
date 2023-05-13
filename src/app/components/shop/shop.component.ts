import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  categoryList: any[] = [];

  constructor(
    private productsService: ProductsService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.categoryList = this.productsService.categoryList;
    if (this.productsService.currentCategory == "") {
      this.loadCategory(this.categoryList[0].id);
    } else {
      this.loadCategory(this.productsService.currentCategory);
    }
  }

  loadCategory(catName: string) {
    this._router.navigate(['/shop', catName]);
    
  }
}
