/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const accesstoken = localStorage.getItem('accesstoken');

        if (accesstoken) {
            const cloned = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${accesstoken}`)
            });

            return next.handle(cloned);
        }
        return next.handle(req);
    }
}
