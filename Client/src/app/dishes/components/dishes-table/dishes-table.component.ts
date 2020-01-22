import { Component, OnInit, AfterViewInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource, MatSort, Sort } from '@angular/material';
import { Dish } from 'src/app/dtos/dish';

@Component({
  selector: 'rg-dishes-table',
  templateUrl: './dishes-table.component.html',
  styleUrls: ['./dishes-table.component.scss']
})
export class DishesTableComponent implements OnInit, AfterViewInit {

  public dataSource = new MatTableDataSource();

  @Output() readonly filterStringChanged = new EventEmitter<string>();
  @Output() readonly sortingChanged = new EventEmitter<Sort>();
  @Input()  set dishesSource(data: Dish[]) {
    this.dataSource = new MatTableDataSource(data);
  }
  @Input() applyedFilter: string;

  @ViewChild(MatSort, { static: false }) sort: MatSort;

  public displayedColumns: string[] = ['edit', 'caption', 'comment'];

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(sorting => this.sortingChanged.emit(sorting));
  }

}
