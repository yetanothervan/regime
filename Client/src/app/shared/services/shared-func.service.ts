import { Injectable } from '@angular/core';
import { IfEmptyPipe } from '../pipes/if-empty.pipe';
import { DishExt } from 'src/app/models/dish-ext';
import { Dish } from 'src/app/dtos/dish';
import { Ingredient } from 'src/app/dtos/ingredient';

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

    sortMatTable(arr: any[], field: string, dirAsc: boolean ) {
        arr.sort((a, b) => {
            const keyA = a[field];
            const keyB = b[field];

            if (dirAsc) {
                if (keyA < keyB) { return -1; }
                if (keyA > keyB) { return 1; }
                return 0;
            } else {
                if (keyA > keyB) { return -1; }
                if (keyA < keyB) { return 1; }
                return 0;
            }
        });
    }

    detailDish(dishes: Dish[], ingredients: Ingredient[]): DishExt[] {
        const result: DishExt[] = [];
        if (!dishes || dishes.length === 0) { return result; }
        dishes.forEach(element => {
            const ext = new DishExt(element, ingredients);
            result.push(ext);
        });

        return result;
    }
}
