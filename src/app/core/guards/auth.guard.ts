import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // 1. Verificar si hay token
  if (!authService.isLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }

  // 2. Lógica de Roles (Opcional pero recomendada para el proyecto)
  // Si la ruta empieza por 'admin', verificar que el usuario sea admin
  const userRole = localStorage.getItem('role'); // O una función en tu service que obtenga el rol

  if (state.url.startsWith('/admin') && userRole !== 'admin') {
    router.navigate(['/home']); // Redirigir al cliente a la tienda si no es admin
    return false;
  }

  return true;
};
