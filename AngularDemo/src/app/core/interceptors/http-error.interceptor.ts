/* eslint-disable no-console */
/* eslint-disable no-restricted-globals */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoadingService } from '../services/loading.service';
import { ToastService } from '../services/toast.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(private loadingService: LoadingService, private translate: TranslateService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                let errorMsg = '';
                if (error.error instanceof ErrorEvent) {
                    console.log('this is client side error');
                    errorMsg = `Error: ${error.error.message}`;
                } else {
                    console.log('this is server side error');
                    errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
                }
                console.log(errorMsg);

                if (error && error.error && !isNaN(error.error)) {
                    let errorMessage = this.translate.instant(`ERROR.${error.error}`);
                    if (!errorMessage || errorMessage === `ERROR.${error.error}`) {
                        errorMessage = this.translate.instant(`ERROR.UNKNOW_ERROR`);
                    }
                    ToastService.error(errorMessage);
                }
                return throwError('');
            })
        );
    }
}
