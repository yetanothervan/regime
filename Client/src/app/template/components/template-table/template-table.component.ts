import { Component, OnInit, AfterViewInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource, MatSort, Sort } from '@angular/material';
import { TemplateDto } from 'src/app/dtos/tmp-dto';

@Component({
  selector: 'rg-template-table',
  templateUrl: './template-table.component.html',
  styleUrls: ['./template-table.component.scss']
})
export class TemplatePfixTableComponent implements OnInit, AfterViewInit {

  public dataSource = new MatTableDataSource();

  @Output() readonly filterStringChanged = new EventEmitter<string>();
  @Output() readonly sortingChanged = new EventEmitter<Sort>();
  @Input()  set templatePfixSource(data: TemplateDto[]) {
    this.dataSource = new MatTableDataSource(data);
  }
  @Input() applyedFilter: string;
  @Input() applyedSorting: Sort;

  @ViewChild(MatSort, { static: false }) sort: MatSort;

  public displayedColumns: string[] = ['edit', 'caption'];

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(sorting => this.sortingChanged.emit(sorting));
  }

}
