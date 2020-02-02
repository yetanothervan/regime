import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from './../../environments/environment';
import { SharedFuncService } from '../shared/services/shared-func.service';
import { Dish } from '../dtos/dish';

@Injectable()
export class DishService {
    constructor(private http: HttpClient, private shared: SharedFuncService) {}

    updateDishes(dish: Dish): Observable<Dish> {
        return this.http.post<Dish>(environment.dishesUrl + 'update-dishes', dish);
    }

    createDishes(dish: Dish): Observable<Dish> {
        dish.id = this.shared.getGuidEmpty();
        return this.http.post<Dish>(environment.dishesUrl + 'update-dishes', dish);
    }
}
