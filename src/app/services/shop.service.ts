import { Injectable, } from '@angular/core';
import { orderedItem } from '../models/orderedItem';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, findIndex } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  private productsUrl = 'api/orderedItems/';

  orderedItems: orderedItem[] = [];
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  c: number;

  constructor(
    private httpClient: HttpClient,

  ) { }

  dodajUKolica(item: orderedItem) {
    return this.httpClient.post('api/orderedItems', item, { headers: this.headers });
  }

  izmeniUKolicima(item: orderedItem) {
    return this.httpClient.put('api/orderedItems', item, { headers: this.headers })
  }

  isprazniKolica(orderedItems: orderedItem[]) {
    return this.httpClient.put('api', orderedItems, { headers: this.headers })
    // return this.httpClient.delete('api')

  }

  reset() {
    this.orderedItems.forEach(item => {
      this.deleteProduct(item.id);
  });
  // this.numberChanged.next(0);

  // reset() {
  //   this.orderedItems.forEach(orderedItem => {
  //     this.deleteProduct(findIndex(orderedItem => orderedItem !==null));
  //   this.deleteProduct(c);
  // });
  // this.numberChanged.next(0);
}

deleteProduct(id: number): Observable < any > {
  return this.httpClient.delete(this.productsUrl + id);
}



preuzmiOrdere() {
  return this.httpClient.get<any[]>('api/orderedItems', {
    headers: this.headers
  })
}
}