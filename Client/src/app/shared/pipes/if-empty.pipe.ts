import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
    name: 'ifEmpty',
    pure: true
})
export class IfEmptyPipe implements PipeTransform {
    transform(value: string): boolean {
        if (typeof value === 'undefined' || value == null) { return true; }
        return value.replace(/\s/g, '').length < 1;
    }
}
