import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FiltersComponent } from '../filters/filters.component';

import { HomeComponent } from './home.component';
import { SurveyListComponent } from '../survey-list/survey-list.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let compiled: any;

  const getByTestId = (id: any, parentNode?: any) => {
    if (!parentNode) {
      parentNode = compiled;
    }
    return parentNode.querySelector(`[data-test-id="${id}"]`);
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent, FiltersComponent, SurveyListComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('Initial UI is rendered as expected', async () => {
    const results = getByTestId('survey-list').children;
    expect(results.length).toEqual(4);
  });

  it('Clicking on "Active" status filter works', async () => {
    const statusLink = getByTestId('status-list').children[2];
    statusLink.click();
    await fixture.whenStable();
    fixture.detectChanges();
    const results = getByTestId('survey-list').children;
    expect(results.length).toEqual(3);
    expect(results[1].children[0].innerHTML.trim()).toEqual('Designer Survey');
    expect(results[1].children[1].innerHTML.trim()).toEqual('Workplace');
    expect(results[1].children[2].innerHTML.trim()).toEqual('Active');
    expect(results[1].children[3].innerHTML.trim()).toEqual('New Framework');
    expect(results[2].children[0].innerHTML.trim()).toEqual('Developer Survey');
    expect(results[2].children[1].innerHTML.trim()).toEqual('Development');
    expect(results[2].children[2].innerHTML.trim()).toEqual('Active');
    expect(results[2].children[3].innerHTML.trim()).toEqual('Education');
  });

  it('Combination of filters works', async () => {
    let statusLink = getByTestId('status-list').children[2];
    statusLink.click();
    await fixture.whenStable();
    fixture.detectChanges();
    let results = getByTestId('survey-list').children;
    expect(results.length).toEqual(3);
    expect(results[1].children[0].innerHTML.trim()).toEqual('Designer Survey');
    expect(results[1].children[1].innerHTML.trim()).toEqual('Workplace');
    expect(results[1].children[2].innerHTML.trim()).toEqual('Active');
    expect(results[1].children[3].innerHTML.trim()).toEqual('New Framework');
    expect(results[2].children[0].innerHTML.trim()).toEqual('Developer Survey');
    expect(results[2].children[1].innerHTML.trim()).toEqual('Development');
    expect(results[2].children[2].innerHTML.trim()).toEqual('Active');
    expect(results[2].children[3].innerHTML.trim()).toEqual('Education');

    let hardwareLink = getByTestId('category-list').children[3];
    hardwareLink.click();
    await fixture.whenStable();
    fixture.detectChanges();
    results = getByTestId('survey-list').children;
    expect(results.length).toEqual(1);

    const workplaceLink = getByTestId('category-list').children[2];
    workplaceLink.click();
    await fixture.whenStable();
    fixture.detectChanges();

    results = getByTestId('survey-list').children;
    expect(results.length).toEqual(2);
    expect(results[1].children[0].innerHTML.trim()).toEqual('Designer Survey');
    expect(results[1].children[1].innerHTML.trim()).toEqual('Workplace');
    expect(results[1].children[2].innerHTML.trim()).toEqual('Active');
    expect(results[1].children[3].innerHTML.trim()).toEqual('New Framework');

    const developmentLink = getByTestId('category-list').children[1];
    developmentLink.click();
    await fixture.whenStable();
    fixture.detectChanges();

    results = getByTestId('survey-list').children;
    expect(results.length).toEqual(2);
    expect(results[1].children[0].innerHTML.trim()).toEqual('Developer Survey');
    expect(results[1].children[1].innerHTML.trim()).toEqual('Development');
    expect(results[1].children[2].innerHTML.trim()).toEqual('Active');
    expect(results[1].children[3].innerHTML.trim()).toEqual('Education');

    const completedLink = getByTestId('status-list').children[3];
    completedLink.click();
    await fixture.whenStable();
    fixture.detectChanges();

    results = getByTestId('survey-list').children;
    expect(results.length).toEqual(1);

    hardwareLink = getByTestId('category-list').children[3];
    hardwareLink.click();
    await fixture.whenStable();
    fixture.detectChanges();

    results = getByTestId('survey-list').children;
    expect(results.length).toEqual(2);
    expect(results[1].children[0].innerHTML.trim()).toEqual('Backend Survey');
    expect(results[1].children[1].innerHTML.trim()).toEqual('Hardware');
    expect(results[1].children[2].innerHTML.trim()).toEqual('Completed');
    expect(results[1].children[3].innerHTML.trim()).toEqual('Personal');

    hardwareLink = getByTestId('category-list').children[3];
    hardwareLink.click();
    await fixture.whenStable();
    fixture.detectChanges();

    const allLink = getByTestId('status-list').children[1];
    allLink.click();
    await fixture.whenStable();
    fixture.detectChanges();
    results = getByTestId('survey-list').children;
    expect(results.length).toEqual(4);
    expect(results[1].children[0].innerHTML.trim()).toEqual('Designer Survey');
    expect(results[1].children[1].innerHTML.trim()).toEqual('Workplace');
    expect(results[1].children[2].innerHTML.trim()).toEqual('Active');
    expect(results[1].children[3].innerHTML.trim()).toEqual('New Framework');
    expect(results[2].children[0].innerHTML.trim()).toEqual('Developer Survey');
    expect(results[2].children[1].innerHTML.trim()).toEqual('Development');
    expect(results[2].children[2].innerHTML.trim()).toEqual('Active');
    expect(results[2].children[3].innerHTML.trim()).toEqual('Education');
    expect(results[3].children[0].innerHTML.trim()).toEqual('Backend Survey');
    expect(results[3].children[1].innerHTML.trim()).toEqual('Hardware');
    expect(results[3].children[2].innerHTML.trim()).toEqual('Completed');
    expect(results[3].children[3].innerHTML.trim()).toEqual('Personal');
  });

  it('Clicking on a category twice render the entire list', async () => {
    const hardwareLink = getByTestId('category-list').children[3];
    hardwareLink.click();
    await fixture.whenStable();
    await fixture.detectChanges();
    let results = getByTestId('survey-list').children;
    expect(results.length).toEqual(2);
    expect(results[1].children[0].innerHTML.trim()).toEqual('Backend Survey');
    expect(results[1].children[1].innerHTML.trim()).toEqual('Hardware');
    expect(results[1].children[2].innerHTML.trim()).toEqual('Completed');
    expect(results[1].children[3].innerHTML.trim()).toEqual('Personal');

    hardwareLink.click();
    await fixture.whenStable();
    await fixture.detectChanges();
    results = getByTestId('survey-list').children;
    expect(results.length).toEqual(4);
    expect(results[1].children[0].innerHTML.trim()).toEqual('Designer Survey');
    expect(results[1].children[1].innerHTML.trim()).toEqual('Workplace');
    expect(results[1].children[2].innerHTML.trim()).toEqual('Active');
    expect(results[1].children[3].innerHTML.trim()).toEqual('New Framework');
    expect(results[2].children[0].innerHTML.trim()).toEqual('Developer Survey');
    expect(results[2].children[1].innerHTML.trim()).toEqual('Development');
    expect(results[2].children[2].innerHTML.trim()).toEqual('Active');
    expect(results[2].children[3].innerHTML.trim()).toEqual('Education');
    expect(results[3].children[0].innerHTML.trim()).toEqual('Backend Survey');
    expect(results[3].children[1].innerHTML.trim()).toEqual('Hardware');
    expect(results[3].children[2].innerHTML.trim()).toEqual('Completed');
    expect(results[3].children[3].innerHTML.trim()).toEqual('Personal');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
