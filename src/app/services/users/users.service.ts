import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateUserDTO, User } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';

const API_URL = `${environment.API_URL}/api/v1/users`;

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private http = inject(HttpClient);

  constructor() {}

  create(dto: CreateUserDTO): Observable<User> {
    return this.http.post<User>(API_URL, dto);
  }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(API_URL);
  }
}
