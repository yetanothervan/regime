import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FakebackService } from 'src/app/fakeback/fakeback.service';

@Injectable()
export class EntitiesInterceptor implements HttpInterceptor {
    constructor(private fakeback: FakebackService) {
    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (req.url.endsWith(environment.ingredientsUrl) && req.method === 'GET') {
            return this.ok(this.fakeback.getIngredients());
        } else
        if (req.url.endsWith(environment.dishesUrl) && req.method === 'GET') {
            return this.ok(this.fakeback.getDishes());
        } else
        if (req.url.endsWith(environment.mealTypesUrl) && req.method === 'GET') {
            return this.ok(this.fakeback.getMealTypes());
        } else
        if (req.url.endsWith(environment.daysUrl) && req.method === 'GET') {
            return this.ok(this.fakeback.getDays());
        } else {
            return next.handle(req);
        }

    }

    ok(body?) {
        return of(new HttpResponse({ status: 200, body }));
    }
}
