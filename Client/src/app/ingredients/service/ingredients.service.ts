import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from './../../../environments/environment';
import { Ingredient } from '../../dtos/ingredient';
import { SharedFuncService } from '../../shared/services/shared-func.service';
import { IngredientsServiceModule } from './ingredients.service-module';

@Injectable({
    providedIn: IngredientsServiceModule
})
export class IngredientsService {
    constructor(private http: HttpClient, private shared: SharedFuncService) {}

    updateIngredient(ingredient: Ingredient): Observable<Ingredient> {
        return this.http.post<Ingredient>(environment.ingredientsUrl + environment.updateIngredient, ingredient);
    }

    createIngredient(ingredient: Ingredient): Observable<Ingredient> {
        ingredient.id = this.shared.getGuidEmpty();
        return this.http.post<Ingredient>(environment.ingredientsUrl + environment.updateIngredient, ingredient);
    }

    deleteIngredient(id: string): Observable<string> {
        return this.http.post<string>(environment.ingredientsUrl + environment.deleteIngredient, `"${id}"`,
                {headers: {'Content-Type':  'application/json'}}
            );
    }
}
