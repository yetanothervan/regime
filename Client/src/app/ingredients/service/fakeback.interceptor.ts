import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class IngredientsInterceptor implements HttpInterceptor {
    constructor() {
    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // const segments = req.url.split('/');
        // const [lastItem] = segments.slice(-1);
        // const currentUrl = '/' + urlTree.root.children.primary.segments.map(it => it.path).join('/');

        if (req.url.includes(environment.ingredientsUrl)) {
            return next.handle(req);
        } else {
            return next.handle(req);
        }

    }
}
