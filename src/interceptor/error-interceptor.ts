import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { StorageService } from "../services/storage.service";
import { AlertController, Backdrop } from "ionic-angular";


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(public storage: StorageService, public alertCtrl: AlertController){

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
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

            switch(errorObj.status){
                case 401:
                this.handle401();
                break;

                case 403:
                this.handle403();
                break;

                default:
                this.handleDefaultError(errorObj);
                break;
            }

            return Observable.throw(errorObj);
        }) as any;
    } 

    handleDefaultError(errorObj){
        let alert = this.alertCtrl.create({
            title: 'Error' + errorObj.status + ': ' + errorObj.error,
            message: errorObj.message,
            enableBackdropDismiss: false,
            buttons: [
                {
                    text:'Ok'
                }
            ]
       });
       alert.present();

    }

    handle401(){
       let alert = this.alertCtrl.create({
            title: 'Error 401: Authentication failed',
            message: 'invalid email or password',
            enableBackdropDismiss: false,
            buttons: [
                {
                    text:'Ok'
                }
            ]
       });
       alert.present();
    }

    handle403(){
        this.storage.setLocalUser(null);
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};