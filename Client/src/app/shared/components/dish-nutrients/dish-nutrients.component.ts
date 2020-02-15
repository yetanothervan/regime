import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'rg-dish-nutrients',
    templateUrl: './dish-nutrients.component.html',
    styleUrls: ['./dish-nutrients.component.scss'],
})
export class DishNutrientsComponent implements OnInit {
    @Input() kkal: number;
    @Input() protein: number;
    @Input() fat: number;
    @Input() carbon: number;

    round(n: number): number {
        return Math.round((n + Number.EPSILON) * 100) / 100;
    }

    ngOnInit(): void {
    }
}
