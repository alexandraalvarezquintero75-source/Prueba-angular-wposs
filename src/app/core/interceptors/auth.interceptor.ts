import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token'); // Recuperamos el JWT

  // Si el token existe, clonamos la petición y le añadimos el Header
  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}` // Formato estándar JWT
      }
    });
    return next(cloned);
  }

  // Si no hay token (ej. en el login), la petición sigue su curso normal
  return next(req);
};
