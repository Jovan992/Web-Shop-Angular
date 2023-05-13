import { Injectable, } from '@angular/core';
import { orderedItem } from '../models/orderedItem';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  private productsUrl = 'api/orderedItems/';

  shopingCartNumberChanged: Subject<number> = new Subject<number>();
  currentNumberOfProducts: number = 0;

  orderedItems: orderedItem[] = [];
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(
    private httpClient: HttpClient,
  ) { }

  getNumbOfroduct(): Observable<number> {
    return this.shopingCartNumberChanged.asObservable();
  };

  dodajUKolica(item: orderedItem) {
    return this.httpClient.post('api/orderedItems', item, { headers: this.headers });
  }

  izmeniUKolicima(item: orderedItem) {
    return this.httpClient.put('api/orderedItems', item, { headers: this.headers })
  }

  isprazniKolica() {
    this.orderedItems.forEach(item => {
      this.deleteProduct(item.id).subscribe({
        next: (data) => {
          console.log(data);
        }
      })
    });
    this.orderedItems = [];
    this.currentNumberOfProducts = 0;
    this.shopingCartNumberChanged.next(0);
  }

  deleteProduct(id: number): Observable<any> {
    return this.httpClient.delete(this.productsUrl + id);
  }

  preuzmiOrdere() {
    return this.httpClient.get<any[]>('api/orderedItems', {
      headers: this.headers
    })
  }
}