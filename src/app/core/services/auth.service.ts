// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable, tap } from 'rxjs';

// // La API de Platzi devuelve access_token y refresh_token
// interface LoginResponse {
//   access_token: string;
//   refresh_token: string;
// }

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   // Definimos la URL base limpia para poder usar diferentes endpoints
//   private API_URL = 'https://api.escuelajs.co/api/v1';

//   constructor(private http: HttpClient) {}

//   // Login
//   login(credentials: { email: string; password: string }): Observable<LoginResponse> {
//     return this.http.post<LoginResponse>(`${this.API_URL}/auth/login`, credentials).pipe(
//       // Usamos tap para guardar el token automáticamente al loguear
//       tap(res => {
//         if (res.access_token) {
//           localStorage.setItem('token', res.access_token);
//         }
//       })
//     );
//   }

//   // Registro: En la Fake Store API de Platzi, el registro es en /users
//   // Nota: Requiere name, email, password y un avatar (puedes poner uno por defecto)
//   register(data: { name: string; email: string; password: string }): Observable<any> {
//     const newUser = {
//       ...data,
//       avatar: 'https://picsum.photos/800' // La API exige un avatar para crear el usuario
//     };
//     return this.http.post(`${this.API_URL}/users`, newUser);
//   }

//   logout(): void {
//     localStorage.removeItem('token');
//   }

//   isLoggedIn(): boolean {
//     return !!localStorage.getItem('token');
//   }

//   getToken(): string | null {
//     return localStorage.getItem('token');
//   }
// }

import { Injectable, signal } from '@angular/core'; // Importamos signal
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

interface LoginResponse {
  access_token: string;
  refresh_token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API_URL = 'https://api.escuelajs.co/api/v1';

  // 1. Creamos un Signal que guarda el estado de la sesión
  // Se inicializa comprobando si ya existe un token
  private _isLoggedIn = signal<boolean>(!!localStorage.getItem('token'));

  // 2. Exponemos el signal como solo lectura para los componentes
  public isLoggedIn = this._isLoggedIn.asReadonly();

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.API_URL}/auth/login`, credentials).pipe(
      tap(res => {
        if (res.access_token) {
          localStorage.setItem('token', res.access_token);
          // 3. ¡IMPORTANTE! Notificamos al signal que el usuario entró
          this._isLoggedIn.set(true);
        }
      })
    );
  }

  register(data: { name: string; email: string; password: string }): Observable<any> {
    const newUser = {
      ...data,
      avatar: 'https://picsum.photos/800'
    };
    return this.http.post(`${this.API_URL}/users`, newUser);
  }

  logout(): void {
    localStorage.removeItem('token');
    // 4. Notificamos al signal que el usuario salió
    this._isLoggedIn.set(false);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
