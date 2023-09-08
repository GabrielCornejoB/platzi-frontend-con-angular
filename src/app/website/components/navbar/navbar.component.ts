import { Component, Input, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Category } from 'src/app/models/product.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { StoreService } from 'src/app/services/store/store.service';
import { TokenService } from 'src/app/services/token/token.service';
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
  private categoriesService = inject(CategoriesService);
  private tokenService = inject(TokenService);
  private router = inject(Router);

  isSideMenuActive: boolean = false;
  counter: number = 0;

  profile: User | null = null;
  categories: Category[] = [];

  constructor() {}
  ngOnInit(): void {
    this.storeService.cart$.subscribe((products) => {
      this.counter = products.length;
    });
    this.getCategories();
    this.authService.profile$.subscribe((data) => (this.profile = data));
  }

  toggleSideMenu() {
    this.isSideMenuActive = !this.isSideMenuActive;
  }

  login() {
    this.authService
      .loginAndGetProfile('admin@mail.com', 'admin123')
      .subscribe(() => this.router.navigate(['/profile']));
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/home');
  }

  getCategories() {
    this.categoriesService.getAll().subscribe((data) => {
      this.categories = data.slice(0, 5);
    });
  }
}
