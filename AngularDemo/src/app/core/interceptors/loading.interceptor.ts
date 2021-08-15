/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoadingService } from '../services/loading.service';

@Injectable({
    providedIn: 'root'
})
export class LoadingInterceptor {
    countActiveRequests = 0;
    ignoreHttpRequest = environment.ignoreLoadingRequest?.split(',') ?? [];
    constructor(private loadingService: LoadingService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let isIgnoreLoadingState = false;
        const serviceRequest = request.url.substring(request.url.lastIndexOf('/') + 1);
        this.ignoreHttpRequest.every((e) => {
            if (e === serviceRequest) {
                isIgnoreLoadingState = true;
                return false;
            }
            return true;
        });

        if (this.countActiveRequests === 0) {
            if (isIgnoreLoadingState) {
                this.loadingService.startLoading(false);
            } else {
                this.loadingService.startLoading(true);
            }
        }

        this.countActiveRequests += 1;

        return next.handle(request).pipe(
            finalize(() => {
                this.countActiveRequests -= 1;
                if (this.countActiveRequests === 0) {
                    this.loadingService.stopLoading(false);
                }
            })
        );
    }
}
