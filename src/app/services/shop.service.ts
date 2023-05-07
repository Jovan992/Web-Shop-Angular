import { Injectable, } from '@angular/core';
import { Cart } from '../components/models/Cart';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  kolica: Cart[] = [];

  constructor() { }
}