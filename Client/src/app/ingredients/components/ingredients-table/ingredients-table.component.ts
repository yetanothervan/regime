import { Component, OnInit, OnDestroy, ChangeDetectorRef, AfterViewInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource, MatSort, Sort } from '@angular/material';
import { Ingredient } from 'src/app/dtos/ingredient';

@Component({
  selector: 'rg-ingredients-table',
  templateUrl: './ingredients-table.component.html',
  styleUrls: ['./ingredients-table.component.scss']
})
export class IngredientsTableComponent implements OnInit, AfterViewInit {

  public dataSource = new MatTableDataSource();

  @Output() readonly filterStringChanged = new EventEmitter<string>();
  @Output() readonly sortingChanged = new EventEmitter<Sort>();
  @Input()  set ingredientsSource(data: Ingredient[]) {
    this.dataSource = new MatTableDataSource(data);
  }
  @Input() applyedFilter: string;

  @ViewChild(MatSort, { static: false }) sort: MatSort;

  public displayedColumns: string[] = ['caption', 'kkal100', 'protein100', 'fat100', 'carbon100', 'comment'];

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(sorting => this.sortingChanged.emit(sorting));
  }

}
