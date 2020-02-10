import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Dish } from '../../dtos/dish';
import { SharedFuncService } from '../../shared/services/shared-func.service';
import { Ingredient } from '../../dtos/ingredient';
import { EntitiesServiceModule } from './entities.service-module';
import { MealType } from 'src/app/dtos/meal-type';

@Injectable({
    providedIn: EntitiesServiceModule
})
export class EntitiesService {

    constructor(private http: HttpClient, private shared: SharedFuncService) {}

    getIngredients(): Observable<Ingredient[]> {
        return this.http.get<Ingredient[]>(environment.ingredientsUrl);
    }

    getDishes(): Observable<Dish[]> {
        return this.http.get<Dish[]>(environment.dishesUrl);
    }

    getMealTypes(): Observable<MealType[]> {
        return this.http.get<MealType[]>(environment.mealTypesUrl);
    }
}
