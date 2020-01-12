import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { RationDay } from '../dtos/ration-day';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';

@Injectable()
export class DaysService {
    private rationDaysUrl = environment.apiBaseUrl + 'rationdays/';

    constructor(private http: HttpClient) {}

    getDays(): Observable<RationDay[]> {
        return this.http.get<RationDay[]>(this.rationDaysUrl);
    }
}
