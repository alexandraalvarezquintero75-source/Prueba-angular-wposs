import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toastr = inject(ToastrService);

  if (!authService.isLoggedIn()) {
    toastr.warning('Debes iniciar sesión para acceder', 'Acceso restringido');
    router.navigate(['/login']);
    return false;
  }

  // Verificación de Rol para rutas de administración
  if (state.url.startsWith('/admin') && !authService.isAdmin()) {
    toastr.error('No tienes permisos de administrador', 'Acceso denegado');
    router.navigate(['/home']);
    return false;
  }

  return true;
};
