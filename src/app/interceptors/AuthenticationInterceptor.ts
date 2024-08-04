import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, of } from "rxjs";

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
    constructor(private _router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem("token");
        
        if (token) {
            const headers = new HttpHeaders({
                Authorization: `Bearer ${token}`
              });
            
            const newReq = req.clone({
                headers: headers
            });
            return next.handle(newReq);
        } else {
            this._router.navigate(['login']);
            return next.handle(req);
        }
    }
}