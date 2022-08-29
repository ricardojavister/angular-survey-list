import { Component, OnInit } from '@angular/core';
import { Survey } from '../types/survey';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  statuses: string[] = ['All', 'Active', 'Completed'];
  categories: string[] = ['Development', 'Workplace', 'Hardware'];
  filteredList!: Survey[];

  lastStatus: string = '';
  lastCategory: string = '';
  lastType: string = 'status';

  status = 'status';
  category = 'category';

  surveyList: Survey[] = [
    {
      title: 'Designer Survey',
      category: 'Workplace',
      status: 'Active',
      label: 'New Framework',
    },
    {
      title: 'Developer Survey',
      category: 'Development',
      status: 'Active',
      label: 'Education',
    },
    {
      title: 'Backend Survey',
      category: 'Hardware',
      status: 'Completed',
      label: 'Personal',
    },
  ];

  ngOnInit() {
    this.filteredList = this.surveyList;
  }

  onFilterSelected(filter: string, type: string) {
    this.filteredList = this.surveyList;
    if (
      filter === 'All' ||
      (this.lastType === 'category' && filter === this.lastCategory)
    ) {
      this.filteredList = this.surveyList;
    } else {
      if (type === 'status') {
        this.lastStatus = filter;
      }

      if (type === 'category') {
        this.lastCategory = filter;
      }

      this.filteredList =
        this.lastStatus !== ''
          ? this.filteredList.filter((x) => x.status === this.lastStatus)
          : this.filteredList;
      this.filteredList =
        this.lastCategory !== ''
          ? this.filteredList.filter((x) => x.category === this.lastCategory)
          : this.filteredList;
    }
    this.lastType = type;
  }
}
