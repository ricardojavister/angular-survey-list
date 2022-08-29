import { Component, Input, OnInit } from '@angular/core';
import { Survey } from '../types/survey';

@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.scss'],
})
export class SurveyListComponent implements OnInit {
  @Input() surveyList!: Survey[];

  ngOnInit() {}
}
