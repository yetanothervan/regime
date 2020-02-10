import { Component, OnInit, AfterViewInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Dish } from 'src/app/dtos/dish';

@Component({
  selector: 'rg-dish-table',
  templateUrl: './dish-table.component.html',
  styleUrls: ['./dish-table.component.scss']
})
export class DishTableComponent implements OnInit, AfterViewInit {

  public dataSource = new MatTableDataSource();

  @Output() readonly filterStringChanged = new EventEmitter<string>();
  @Output() readonly sortingChanged = new EventEmitter<Sort>();
  @Input()  set dishSource(data: Dish[]) {
    this.dataSource = new MatTableDataSource(data);
  }
  @Input() applyedFilter: string;
  @Input() applyedSorting: Sort;

  @ViewChild(MatSort) sort: MatSort;

  public displayedColumns: string[] = ['edit', 'caption', 'category', 'proteinPer', 'fatPer', 'carbonPer', 'comment'];

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(sorting => this.sortingChanged.emit(sorting));
  }

}
