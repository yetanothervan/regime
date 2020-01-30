import { Injectable } from '@angular/core';
import {
    CanActivate, Router, ActivatedRouteSnapshot,
    UrlTree, RouterState, ActivatedRoute, RouterStateSnapshot
} from '@angular/router';
import * as me from '.';
import { map } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class IngredientsPathSaveGuard implements CanActivate {
    constructor(private router: Router, private active: ActivatedRoute, private store: Store<me.IngredientsState>) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.store.pipe(
            select(me.getUrlCurrenWithId),
            map(path => {
                if (path.url === me.allPath) {
                    this.router.navigate([state.url + '/' + me.allPath]);
                } else if (path.url === me.editPath) {
                    this.router.navigate([state.url + '/' + me.editPath, { id: path.url }]);
                }
                return true;
            })
        );
    }
}
