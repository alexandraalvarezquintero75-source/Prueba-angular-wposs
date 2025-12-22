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

  // 1. Login optimizado: Obtiene token y perfil en un solo flujo
  login(credentials: { email: string; password: string }): Observable<User> {
    return this.http.post<LoginResponse>(`${this.API_URL}/auth/login`, credentials).pipe(
      tap((res) => {
        if (res.access_token) {
          localStorage.setItem('token', res.access_token); // Guardar JWT
          this._isLoggedIn.set(true);
        }
      }),
      // Una vez logueado, usamos switchMap para pedir el perfil inmediatamente
      switchMap(() => this.getProfile())
    );
  }

  // 2. Obtener el perfil del usuario (necesario para saber el rol)
  getProfile(): Observable<User> {
    return this.http.get<User>(`${this.API_URL}/auth/profile`).pipe(
      tap((user) => {
        this.userProfile.set(user);
        console.log('Perfil cargado:', user.role); // Para debuggear el rol
      })
    );
  }

  // 3. Método auxiliar para el AuthGuard
  isAdmin(): boolean {
    const user = this.userProfile();
    return user?.role === 'admin'; // El requerimiento pide validar admin/customer
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    this.userProfile.set(null);
    this._isLoggedIn.set(false);
  }

  register(data: { name: string; email: string; password: string }): Observable<any> {
    const newUser = { ...data, avatar: 'https://picsum.photos/800' };
    return this.http.post(`${this.API_URL}/users`, newUser);
  }
}
