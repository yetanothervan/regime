import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from './../../environments/environment';
import { SharedFuncService } from '../shared/services/shared-func.service';

import { TemplateDto } from '../dtos/tmp-dto';
// prefix TemplatePrefix
// prefix templatePrefix
// postfix TemplatePostfix
// postfix template-postfix
// param templateParam

@Injectable()
export class TemplatePrefixService {
    constructor(private http: HttpClient, private shared: SharedFuncService) {}

    updateTemplatePostfix(templateParam: TemplateDto): Observable<TemplateDto> {
        return this.http.post<TemplateDto>(environment.templatePrefixUrl + 'update-template-postfix', templateParam);
    }

    createTemplatePostfix(templateParam: TemplateDto): Observable<TemplateDto> {
        templateParam.id = this.shared.getGuidEmpty();
        return this.http.post<TemplateDto>(environment.templatePrefixUrl + 'update-template-postfix', templateParam);
    }
}
