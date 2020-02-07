import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from './../../../environments/environment';
import { SharedFuncService } from '../../shared/services/shared-func.service';
import { Dish } from '../../dtos/dish';
import { DishServiceModule } from './dish.service-module';

@Injectable({
    providedIn: DishServiceModule
})
export class DishService {
    constructor(private http: HttpClient, private shared: SharedFuncService) { }

    updateDish(dish: Dish): Observable<Dish> {
        return this.http.post<Dish>(environment.dishesUrl + environment.updateDish, dish);
    }

    createDish(dish: Dish): Observable<Dish> {
        dish.id = this.shared.getGuidEmpty();
        return this.http.post<Dish>(environment.dishesUrl + environment.updateDish, dish);
    }

    deleteDish(id: string): Observable<string> {
        return this.http.post<string>(environment.dishesUrl + environment.deleteDish, `"${id}"`,
            { headers: { 'Content-Type': 'application/json' } }
        );
    }
}
