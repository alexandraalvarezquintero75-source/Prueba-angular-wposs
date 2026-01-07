import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, switchMap, of } from 'rxjs'; //rxjs flujos de datos asinccronos
import { User } from '../../shared/components/models/user.model';

interface LoginResponse {
  access_token: string;
  refresh_token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API_URL = 'https://api.escuelajs.co/api/v1';
  private userProfile = signal<User | null>(null);
  public currentUser = this.userProfile.asReadonly();

  private _isLoggedIn = signal<boolean>(!!localStorage.getItem('token'));// si hay sesión activa chequeo localStorage"
  public isLoggedIn = this._isLoggedIn.asReadonly(); //asReadonly() convierte  la signal en solo lectura

  constructor(private http: HttpClient) {
    const token = this.getToken();
    if (token) {
      this.getProfile().subscribe({
        error: () => this.logout(),
      });
    }
  }

  //enviamos el correo y la contraseña
  login(credentials: { email: string; password: string }): Observable<User> {
    return this.http
      .post<LoginResponse>(`${this.API_URL}/auth/login`, credentials)
      .pipe(//con pipe procesamos la respuesta paso a paso
        tap((res) => {
          if (res.access_token) {
            localStorage.setItem('token', res.access_token);
            this._isLoggedIn.set(true);
          }
        }),

        switchMap(() => this.getProfile())
      );
  }
  getProfile(): Observable<User> {
    const token = this.getToken();

    return this.http
      .get<User>(`${this.API_URL}/auth/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .pipe(
        tap((user) => {
          this.userProfile.set(user);
        })
      );
  }

  isAdmin(): boolean {
    const user = this.userProfile();
    return user?.role === 'admin';
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    this.userProfile.set(null);
    this._isLoggedIn.set(false);
  }

  register(data: {
    name: string;
    email: string;
    password: string;
  }): Observable<any> {
    const newUser = { ...data, avatar: 'https://placebear.com/640/480' };
    return this.http.post(`${this.API_URL}/users`, newUser);
  }
}
