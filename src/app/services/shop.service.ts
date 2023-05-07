import { Injectable, } from '@angular/core';
import { orderedItem } from '../models/orderedItem';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  
  orderedItems: orderedItem[] = [];
  headers = new HttpHeaders().set('Content-Type', 'application/json');

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
    
    console.log(this.httpClient.delete('api'))
  } 

  preuzmiOrdere() {
    return this.httpClient.get<any[]>('api/orderedItems', {
      headers: this.headers
    })
  }
}