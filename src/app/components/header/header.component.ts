import { Component, OnInit, } from '@angular/core';
import { interval } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  brojKorpe: number;

  constructor(
    private shopService: ShopService,
    public authService: AuthService
  ) {

  }
  ngOnInit(): void {

    this.brojKorpe = this.shopService.orderedItems.length;
    setInterval(() => {
      this.brojKorpe = this.shopService.orderedItems.length;
      ;
    }, 100);
  }

  // setujBrojKorpe(){
  //  this.brojKorpe = this.shopService.orderedItems.length;
  // }
}
