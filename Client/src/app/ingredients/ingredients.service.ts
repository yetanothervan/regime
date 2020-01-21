import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { of } from 'rxjs';

import { environment } from './../../environments/environment';
import { Ingredient } from '../dtos/ingredient';
import { SharedFuncService } from '../shared/services/shared-func.service';

@Injectable()
export class IngredientsService {
    private ingredientsUrl = environment.apiBaseUrl + 'ingredients/';

    constructor(private http: HttpClient, private shared: SharedFuncService) {}

    getIngredients(): Observable<Ingredient[]> {
        return this.http.get<Ingredient[]>(this.ingredientsUrl);
    }

    updateIngredient(ingredient: Ingredient): Observable<Ingredient> {
        return this.http.post<Ingredient>(this.ingredientsUrl + 'update-ingredient', ingredient);
    }

    createIngredient(ingredient: Ingredient): Observable<Ingredient> {
        ingredient.id = this.shared.getGuidEmpty();
        return this.http.post<Ingredient>(this.ingredientsUrl + 'update-ingredient', ingredient);
    }
}
