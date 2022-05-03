import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InlineCicleChartComponent } from './inline-cicle-chart.component';

describe('InlineCicleChartComponent', () => {
  let component: InlineCicleChartComponent;
  let fixture: ComponentFixture<InlineCicleChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InlineCicleChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InlineCicleChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
