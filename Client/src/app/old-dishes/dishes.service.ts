import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SharedFuncService } from '../shared/services/shared-func.service';
import { Dish } from '../dtos/dish';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class DishesService {
    constructor(private http: HttpClient, private shared: SharedFuncService) {}
    updateDish(dish: Dish): Observable<Dish> {
        return this.http.post<Dish>(environment.dishesUrl + 'update-dish', dish);
    }

    createDish(dish: Dish): Observable<Dish> {
        dish.id = this.shared.getGuidEmpty();
        return this.http.post<Dish>(environment.dishesUrl + 'update-dish', dish);
    }
}
