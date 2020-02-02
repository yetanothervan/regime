import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from './../../environments/environment';
import { SharedFuncService } from '../shared/services/shared-func.service';

import { TemplateDto } from '../dtos/tmp-dto';
// pfix TemplatePfix
// pfix templatePfix
// pfix template-pfix
// param templateParam

@Injectable()
export class TemplatePfixService {
    constructor(private http: HttpClient, private shared: SharedFuncService) {}

    updateTemplatePfix(templateParam: TemplateDto): Observable<TemplateDto> {
        return this.http.post<TemplateDto>(environment.templatePfixUrl + 'update-template-pfix', templateParam);
    }

    createTemplatePfix(templateParam: TemplateDto): Observable<TemplateDto> {
        templateParam.id = this.shared.getGuidEmpty();
        return this.http.post<TemplateDto>(environment.templatePfixUrl + 'update-template-pfix', templateParam);
    }
}
