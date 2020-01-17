import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { Ingredient } from '../dtos/ingredient';

@Injectable()
export class IngredientsService {
    private ingredientsUrl = environment.apiBaseUrl + 'ingredients/';

    constructor(private http: HttpClient) {}

    getIngredients(): Observable<Ingredient[]> {
        return this.http.get<Ingredient[]>(this.ingredientsUrl);
    }
}
