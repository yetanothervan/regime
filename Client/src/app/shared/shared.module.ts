import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { IfEmptyPipe } from './pipes/if-empty.pipe';
import { SharedFuncService } from './services/shared-func.service';


@NgModule({
    imports: [CommonModule, HttpClientModule],
    declarations: [IfEmptyPipe],
    exports: [CommonModule, HttpClientModule,
        IfEmptyPipe]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
          ngModule: SharedModule,
          providers: [ SharedFuncService, IfEmptyPipe ]
        };
      }
}
