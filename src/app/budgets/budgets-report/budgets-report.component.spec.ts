import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetsReportComponent } from './budgets-report.component';

describe('BudgetsReportComponent', () => {
  let component: BudgetsReportComponent;
  let fixture: ComponentFixture<BudgetsReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetsReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
