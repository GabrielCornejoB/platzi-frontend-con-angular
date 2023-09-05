import { Component, OnInit, inject } from '@angular/core';
import { StoreService } from 'src/app/services/store/store.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  private storeService = inject(StoreService);

  isSideMenuActive: boolean = false;
  counter: number = 0;

  constructor() {}
  ngOnInit(): void {
    this.storeService.cart$.subscribe((products) => {
      this.counter = products.length;
    });
  }

  toggleSideMenu() {
    this.isSideMenuActive = !this.isSideMenuActive;
  }
}
