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

                const urlTree = this.router.parseUrl(this.router.url); 
                const currentUrl = '/' + urlTree.root.children.primary.segments.map(it => it.path).join('/');

                const editPath = state.url + '/' + me.editPath;
                const allPath = state.url + '/' + me.allPath;

                if (path.url === me.allPath) { // we were at all path, so let's go back to all
                    this.router.navigate([allPath]);
                } else if (path.url === me.editPath && currentUrl === editPath) { // we are editing something, back to all
                    this.router.navigate([allPath]);
                } else if (path.url === me.editPath) { // we were editing something, so let's continue
                    this.router.navigate([state.url + '/' + me.editPath, { id: path.id }]);
                }
                return true;
            })
        );
    }
}
