import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from './../../environments/environment';
import { Dish } from '../dtos/dish';
import { SharedFuncService } from '../shared/services/shared-func.service';

@Injectable()
export class EntitiesService {
    private dishesUrl = environment.apiBaseUrl + environment.dishesUrl;

    constructor(private http: HttpClient, private shared: SharedFuncService) {}

    getDishes(): Observable<Dish[]> {
        return this.http.get<Dish[]>(this.dishesUrl);
    }
}
