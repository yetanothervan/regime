import { Injectable } from '@angular/core';
import { IfEmptyPipe } from '../pipes/if-empty.pipe';

@Injectable()
export class SharedFuncService {
    constructor(private ifEmptyPipe: IfEmptyPipe) {
    }

    ifEmpty(value: string) {
        return this.ifEmptyPipe.transform(value);
    }

    getGuidEmpty(): string {
        return '00000000-0000-0000-0000-000000000000';
    }
}
