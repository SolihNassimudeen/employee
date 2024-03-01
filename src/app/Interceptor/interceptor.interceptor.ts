import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { CommonService } from '../service/common.service';

@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {

    private activeRequests = 0;

    constructor(private commonService: CommonService) { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        this.activeRequests++;

        this.commonService.isLoading = true;

        return next.handle(request).pipe(
            catchError(error => {
                return throwError(error);
            }),
            finalize(() => {
                this.activeRequests--;

                if (this.activeRequests === 0) {
                    this.commonService.isLoading = false;
                }
            })
        );
    }
}
