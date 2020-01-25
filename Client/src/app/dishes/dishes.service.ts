import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SharedFuncService } from '../shared/services/shared-func.service';

@Injectable()
export class DishesService {
    constructor(private http: HttpClient, private shared: SharedFuncService) {}
}
