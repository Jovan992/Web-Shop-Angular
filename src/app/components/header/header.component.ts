import { Component, OnDestroy, OnInit, } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  numbOfProduct: number = 0;

  constructor(
    private shopService: ShopService,
    public authService: AuthService
  ) {

  }
  ngOnInit(): void {
    this.subscription = this.shopService.getNumbOfroduct().subscribe(numb => {
      this.numbOfProduct = numb;
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
