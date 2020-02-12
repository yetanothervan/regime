import { Injectable } from '@angular/core';
import { MealTypesServiceModule } from './meal-types-service.module';
import { SharedFuncService } from 'src/app/shared/services/shared-func.service';
import { HttpClient } from '@angular/common/http';
import { MealType } from 'src/app/dtos/meal-type';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: MealTypesServiceModule
})
export class MealTypesService {

  constructor(private http: HttpClient, private shared: SharedFuncService) { }
  updateMealType(mealType: MealType): Observable<MealType> {
    return this.http.post<MealType>(environment.mealTypesUrl + environment.updateMealType, mealType);
  }
  createMealType(mealType: MealType): Observable<MealType> {
    mealType.id = this.shared.getGuidEmpty();
    return this.http.post<MealType>(environment.mealTypesUrl + environment.updateMealType, mealType);
  }
  deleteMealType(id: string): Observable<string> {
    return this.http.post<string>(environment.mealTypesUrl + environment.deleteMealType, `"${id}"`,
      { headers: { 'Content-Type': 'application/json' } }
    );
  }
}
