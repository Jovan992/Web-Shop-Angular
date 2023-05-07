import { Component, OnInit, } from '@angular/core';
import { interval } from 'rxjs';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  brojKorpe: number;

  

  constructor(
    private shopService: ShopService
  ) {

  }
  ngOnInit(): void {
    {
      this.brojKorpe = this.shopService.kolica.length;
      setInterval(() => {
        this.brojKorpe = this.shopService.kolica.length;
        ;
      }, 100);
    }
  }


}
