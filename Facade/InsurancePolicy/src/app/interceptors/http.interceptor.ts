import { HttpInterceptorFn } from '@angular/common/http';
import {SigninResponse} from '../../types';
import {catchError, throwError} from 'rxjs';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const xToken = localStorage.getItem('X-Insurance-Token');
  const token = xToken ? (JSON.parse(xToken) as SigninResponse).accessToken : "";

  const clonedRequest = token
    ? req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    })
    : req;

  return next(clonedRequest).pipe(
    catchError((error) => {
      if (error.status === 401) {
        localStorage.removeItem('X-Insurance-Token');
        localStorage.removeItem('X-Insurance-User');

        if (req.url.includes('/login')) {
          return throwError(() => error);
        }

        window.location.reload();
      }
      return throwError(() => error);
    })
  );
};

