import { Injectable } from '@angular/core';
import { DaysServiceModule } from './days-service.module';
import { HttpClient } from '@angular/common/http';
import { SharedFuncService } from 'src/app/shared/services/shared-func.service';
import { RationDay } from 'src/app/dtos/ration-day';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: DaysServiceModule
})
export class DaysService {

  constructor(private http: HttpClient, private shared: SharedFuncService) { }
  updateRationDay(day: RationDay): Observable<RationDay> {
    return this.http.post<RationDay>(environment.daysUrl + environment.updateRationDay, day);
  }
  createRationDay(day: RationDay): Observable<RationDay> {
    day.id = this.shared.getGuidEmpty();
    return this.http.post<RationDay>(environment.daysUrl + environment.updateRationDay, day);
  }
  deleteRationDay(id: string): Observable<string> {
    return this.http.post<string>(environment.daysUrl + environment.deleteRationDay, `"${id}"`,
      { headers: { 'Content-Type': 'application/json' } }
    );
  }
}
