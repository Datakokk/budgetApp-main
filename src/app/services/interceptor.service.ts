import { HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService {

  constructor(private router: Router,
              private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.authService.setSending(true);  
    let request;
    // if(localStorage.getItem('token')) {
    //   const token = localStorage.getItem('token') + '';
    //   request = req.clone({
    //     setHeaders: {authorization: token},
    //     withCredentials: true
    //   })
    // } else {
      request = req.clone({
        withCredentials: true
      })
    // }

    return next.handle(request)
               .pipe(
                  tap((event: HttpEvent<any>) => {
                    if(event instanceof HttpResponse) {
                      this.authService.setSending(false);
                    }
                    if(event instanceof HttpResponse && event.status === 200) {
                      console.log('Usuario autenticado')
                    }
                  }),
                  catchError((err: HttpErrorResponse) => {
                    this.authService.setSending(false);
                    if(err.status === 403) {
                      this.router.navigate(['/login']);
                    }
                    return throwError(err)
                  })
               )
  
  }


}
