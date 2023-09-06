import { Component, Input, OnInit, inject } from '@angular/core';
import { switchMap } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { StoreService } from 'src/app/services/store/store.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  private storeService = inject(StoreService);
  private authService = inject(AuthService);
  private usersService = inject(UsersService);

  isSideMenuActive: boolean = false;
  counter: number = 0;

  profile: User | undefined;

  constructor() {}
  ngOnInit(): void {
    this.storeService.cart$.subscribe((products) => {
      this.counter = products.length;
    });
  }

  toggleSideMenu() {
    this.isSideMenuActive = !this.isSideMenuActive;
  }

  login() {
    this.authService
      .loginAndGetProfile('testmail@mail.com', '12345A')
      .subscribe((user) => (this.profile = user));
  }
}
