import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  // 1. Buscamos el token que guardaste en el login
  const token = localStorage.getItem('token');

  // 2. Si el token existe, clonamos la petición y le ponemos la "llave"
  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    // 3. Enviamos la petición con el token
    return next(cloned);
  }

  // Si no hay token (ej. en el login), la petición sigue normal
  return next(req);
};
