import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, switchMap, of } from 'rxjs';
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
  private http = inject(HttpClient);

  // Signals para manejar el estado global de la sesión
  private userProfile = signal<User | null>(null);
  public currentUser = this.userProfile.asReadonly();

  private _isLoggedIn = signal<boolean>(!!localStorage.getItem('token'));
  public isLoggedIn = this._isLoggedIn.asReadonly();

  constructor() {
    const token = this.getToken();
    if (token) {
      this.getProfile().subscribe({
        error: () => this.logout(), // Si el token expiró, limpiamos
      });
    }
  }

  login(credentials: { email: string; password: string }): Observable<User> {
    return this.http
      .post<LoginResponse>(`${this.API_URL}/auth/login`, credentials)
      .pipe(
        tap((res) => {
          if (res.access_token) {
            localStorage.setItem('token', res.access_token);
            this._isLoggedIn.set(true);
          }
        }),

        switchMap(() => this.getProfile())
      );
  }

  // getProfile(): Observable<User> {
  //   return this.http.get<User>(`${this.API_URL}/auth/profile`).pipe(
  //     tap((user) => {
  //       this.userProfile.set(user);
  //       console.log('Perfil cargado:', user.role);
  //     })
  //   );
  // }
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
          console.log('Perfil cargado:', user.role);
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
    // const newUser = { ...data, avatar: 'https://picsum.photos/800' };
    const newUser = { ...data, avatar: 'https://placebear.com/640/480' };
    return this.http.post(`${this.API_URL}/users`, newUser);
  }
}
