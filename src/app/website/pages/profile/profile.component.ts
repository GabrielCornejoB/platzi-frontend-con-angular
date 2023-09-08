import { Component, OnInit, inject } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  private authService = inject(AuthService);

  user: User | null = null;

  ngOnInit(): void {
    this.authService.profile$.subscribe((data) => {
      this.user = data;
    });
  }
}
