import { createReducer, on, Action } from '@ngrx/store';
import * as me from '.';
import * as root from 'src/app/root-store';
import { Sort } from '@angular/material/sort/typings/public-api';
import { Dish } from 'src/app/dtos/dish';
import { isDishEqual, copyDish } from 'src/app/dtos';

// state
export interface DishState {
    filterString: string;
    sorting: Sort;
    // path save
    urlCurrent: string;
    idCurrent: string;
    // edited dish
    dishCurrentMutable: Dish;
    // statuses
    deleteStatus: string;
}

const newDish = { id: '', caption: '', items: [], comment: '', category: '' } as Dish;
const initialState: DishState = {
    filterString: '',
    sorting: { active: '', direction: '' },
    // path save
    urlCurrent: me.allPath,
    idCurrent: '',
    // edited dish dto
    dishCurrentMutable: newDish,
    // statuses
    deleteStatus: ''
};

// reducer

const dishReducer = createReducer(
    initialState,
    on(me.DishActions.dishSetFilter, (state: DishState, { filterString }) => ({ ...state, filterString })),
    on(me.DishActions.dishSetSorting, (state: DishState, { sorting }) => ({ ...state, sorting })),
    on(me.DishActions.dishPathAllNavigated, (state: DishState) =>
        ({ ...state, urlCurrent: me.allPath, dishCurrentMutable: newDish, deleteStatus: '' })),
    on(me.DishActions.dishPathEditNavigated, (state: DishState, { id }) =>
        ({ ...state, urlCurrent: me.editPath, idCurrent: id })),
    on(me.DishActions.dishSetCurrentEditing, (state: DishState, { dish }) => {
        if (isDishEqual(state.dishCurrentMutable, dish)) {
            return { ...state };
        } else {
            return { ...state, dishCurrentMutable: copyDish(dish), deleteStatus: '' };
        }
    }),
    on(me.DishActions.dishDeleteFailed, (state: DishState, { status }) =>
        ({ ...state, deleteStatus: status })),
    on(root.RootActions.dishDeleteSuccess, (state: DishState, { id }) =>
        ({ ...state, deleteStatus: id }))
);


export function reducer(state: DishState | undefined, action: Action) {
    return dishReducer(state, action);
}
