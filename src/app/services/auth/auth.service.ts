import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, switchMap, tap } from 'rxjs';
import { Auth } from 'src/app/models/auth.model';
import { User } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';
import { TokenService } from '../token/token.service';

const API_URL = `${environment.API_URL}/api/v1/auth`;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private tokenService = inject(TokenService);

  constructor() {}

  login(email: string, password: string): Observable<Auth> {
    return this.http.post<Auth>(`${API_URL}/login`, { email, password }).pipe(
      tap((res) => {
        this.tokenService.saveToken(res.access_token);
      })
    );
  }

  getProfile(): Observable<User> {
    return this.http.get<User>(`${API_URL}/profile`, {});
  }

  loginAndGetProfile(email: string, password: string): Observable<User> {
    return this.login(email, password).pipe(switchMap(() => this.getProfile()));
  }
}
