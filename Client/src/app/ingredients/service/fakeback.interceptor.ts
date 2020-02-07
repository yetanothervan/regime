import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable()
export class IngredientsInterceptor implements HttpInterceptor {
    constructor(private router: Router) {
    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const urlTree = this.router.parseUrl(this.router.url);
        const currentUrl = '/' + urlTree.root.children.primary.segments.map(it => it.path).join('/');

        if (req.url.includes(environment.ingredientsUrl)) {
            return next.handle(req);
        } else {
            return next.handle(req);
        }

    }
}
