import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements OnInit {
  @Input() filterType!: string;
  @Input() filterValues!: string[];
  @Output() onFilterSelected: EventEmitter<string> = new EventEmitter<string>();
  selectedFilter: string = '';

  ngOnInit() {}

  selectFilter(filter: string): void {
    this.selectedFilter = filter;
    this.onFilterSelected.emit(filter);
  }
}
