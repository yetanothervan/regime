import { createReducer, on, Action } from '@ngrx/store';
import * as me from '.';
import { Sort } from '@angular/material/sort/typings/public-api';
import { Dish } from 'src/app/dtos/dish';

// state
export interface DishState {
    filterString: string;
    sorting: Sort;
    // path save
    urlCurrent: string;
    idCurrent: string;
    // edited dish
    dishCurrent: Dish;
}

const newDish = { id: '', caption: '' } as Dish;
const initialState: DishState = {
    filterString: '',
    sorting: { active: '', direction: '' },
    // path save
    urlCurrent: me.allPath,
    idCurrent: '',
    // edited dish dto
    dishCurrent: newDish
};

// reducer

const dishReducer = createReducer(
    initialState,
    on(me.DishActions.dishSetFilter, (state: DishState, { filterString }) => ({ ...state, filterString })),
    on(me.DishActions.dishSetSorting, (state: DishState, { sorting }) => ({ ...state, sorting })),
    on(me.DishActions.dishPathAllNavigated, (state: DishState) =>
        ({ ...state, urlCurrent: me.allPath, dishCurrent: newDish })),
    on(me.DishActions.dishPathEditNavigated, (state: DishState, { id }) =>
        ({ ...state, urlCurrent: me.editPath, idCurrent: id })),
    on(me.DishActions.dishSetCurrentEditing, (state: DishState, { dish }) =>
        ({ ...state, dishCurrent: dish })),
);

export function reducer(state: DishState | undefined, action: Action) {
    return dishReducer(state, action);
}
