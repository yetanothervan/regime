import { Dish } from 'src/app/dtos/dish';

export class DishExt extends Dish {
    public get proteinPer(): number {
        return 1;
    }

    public get carbonPer(): number {
        return 1;
    }

    public get fatPer(): number {
        return 1;
    }
}
