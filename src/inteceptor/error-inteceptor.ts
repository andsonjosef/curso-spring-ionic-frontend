import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable } from "rxjs/Rx";


@Injectable()
export class ErrorIntecptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("passed by intecptor");
        return next.handle(req)
        .catch((error, caugth) => {
            let errorObj = error;
            if(errorObj.error){
                errorObj = errorObj.error;
            }
            if(!errorObj.status){
                errorObj = JSON.parse(errorObj);
            }

            console.log("Error detected by interceptor");
            console.log(errorObj);

            return Observable.throw(errorObj);
        }) as any;
    } 
}

export const ErrorIntecptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorIntecptor,
    multi: true,
};