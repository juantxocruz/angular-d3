import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InlineCirclesChartComponent } from './inline-circles-chart.component';

describe('InlineCirclesChartComponent', () => {
  let component: InlineCirclesChartComponent;
  let fixture: ComponentFixture<InlineCirclesChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InlineCirclesChartComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InlineCirclesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
