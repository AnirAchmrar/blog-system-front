import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  user: User = <User>{};

  private baseURL: string = 'http://localhost:8090';

  constructor(private http: HttpClient, private router: Router) {
    const token = localStorage.getItem('access_token');
    this._isLoggedIn$.next(!!token);
  }

  login(username: string, password: string) {
    return this.http
      .post<any>(this.baseURL + '/auth', { username, password })
      .pipe(
        map((response: any) => {
          localStorage.setItem('access_token', response['access_token']);
          localStorage.setItem('user', JSON.stringify(response.user));
          this._isLoggedIn$.next(true);
        })
      );
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  logOut() {
    localStorage.clear();
    this._isLoggedIn$.next(false);
    this.router.navigate(['login']);
  }
}
