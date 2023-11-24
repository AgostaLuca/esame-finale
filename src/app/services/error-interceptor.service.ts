import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorInterceptorService implements HttpInterceptor {
  constructor() {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // console.log("chiamata", req);
    // return next.handle(req).pipe(
    //   tap((resp) => { console.log("risposta", resp) })
    // )

    return next.handle(req).pipe(
      tap(
        (event) => {
          if (event instanceof HttpResponse && event.status !== 200) {
            alert('Error. Incorrect latitude o longitude!');
          }
        },
        (error) => {
          alert('Error. Incorrect latitude o longitude!');
        }
        // VERSIONE FATTA CON IL PROF NON FUNZIONANTE
        //   {
        //   // Succeeds when there is a response; ignore other events
        //   // next: (event) => {
        //   //   if(event instanceof HttpResponse){
        //   //     if(event.status !== 200) {
        //   //       alert('errore');
        //   //     }
        //   //     // qui controllo se nel body della risposta è presente una proprietà
        //   //     // per esempio se passi lat e lon sbagliate weather ritorna una risposta diversa, quindi
        //   //     // posso controllare se la proprietà x è presente nella risposta se non c'è vuol dire che ho passato
        //   //     // lon o lat sbagliate
        //   //     // else if (!event.body.sunrise) {

        //   //     // }
        //   //     console.log("entra1");
        //   //   }
        //   // },
        //   // // Operation failed; error is an HttpErrorResponse
        //   // error: (_error) => (ok = 'failed')
        // }
      )
    );
  }
}
