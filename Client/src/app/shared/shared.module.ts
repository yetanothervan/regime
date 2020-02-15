import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { IfEmptyPipe } from './pipes/if-empty.pipe';
import { DishNutrientsComponent } from './components/dish-nutrients/dish-nutrients.component';

@NgModule({
    imports: [CommonModule, HttpClientModule],
    declarations: [
      IfEmptyPipe,
      DishNutrientsComponent
    ],
    exports: [CommonModule, HttpClientModule, IfEmptyPipe, DishNutrientsComponent]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders<SharedModule> {
        return {
          ngModule: SharedModule,
          providers: [ IfEmptyPipe ]
        };
      }
}
