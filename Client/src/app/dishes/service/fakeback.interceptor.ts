import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FakebackService } from 'src/app/shared/services/fakeback.service';

@Injectable()
export class DishInterceptor implements HttpInterceptor {
    constructor(private fakeback: FakebackService) {
    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url.includes(environment.dishesUrl)
            && req.url.endsWith(environment.updateDish)
            && req.method === 'POST') {
            return this.ok(this.fakeback.updateDish(req.body));
        } else
        if (req.url.includes(environment.dishesUrl)
            && req.url.endsWith(environment.deleteDish)
            && req.method === 'POST') {
            const deleted = this.fakeback.deleteDish(req.body);
            return deleted === req.body ? this.ok(deleted) : this.badRequest(deleted);
        } else {
            return next.handle(req);
        }
    }

    ok(body?) {
        return of(new HttpResponse({ status: 200, body }));
    }

    badRequest(body?) {
        return of(new HttpResponse({ status: 400, body }));
    }

    error(message) {
        return throwError({ error: { message } });
    }
}
