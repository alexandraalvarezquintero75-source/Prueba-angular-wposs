import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Verificación básica de login
  if (!authService.isLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }

  // Verificación de Rol para rutas de administración
  if (state.url.startsWith('/admin') && !authService.isAdmin()) {
    console.warn('Acceso denegado: Se requiere rol de administrador');
    router.navigate(['/home']);
    return false;
  }

  return true;
};
