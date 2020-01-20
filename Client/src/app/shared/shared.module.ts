import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { IfEmptyPipe } from './pipes/if-empty.pipe';

@NgModule({
    imports: [CommonModule, HttpClientModule],
    declarations: [IfEmptyPipe],
    exports: [CommonModule, HttpClientModule,
        IfEmptyPipe]
})
export class SharedModule { }