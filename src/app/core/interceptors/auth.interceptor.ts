import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');

  // const isAuthRequest = req.url.includes('/auth/login') || req.url.includes('/users');
  const isAuthRequest =
    req.url.includes('/auth/login') ||
    (req.url.includes('/users') && req.method === 'POST');
  if (token && !isAuthRequest) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(cloned);
  }
  return next(req);
};
