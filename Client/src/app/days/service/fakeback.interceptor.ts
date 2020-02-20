import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FakebackService } from 'src/app/fakeback/fakeback.service';

@Injectable()
export class DaysInterceptor implements HttpInterceptor {
    constructor(private fakeback: FakebackService) {
    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url.includes(environment.daysUrl)
            && req.url.endsWith(environment.updateRationDay)
            && req.method === 'POST') {
            return this.ok(this.fakeback.updateDay(req.body));
        } else
        if (req.url.includes(environment.daysUrl)
            && req.url.endsWith(environment.deleteRationDay)
            && req.method === 'POST') {
            const deleted = this.fakeback.deleteDay(req.body);
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
