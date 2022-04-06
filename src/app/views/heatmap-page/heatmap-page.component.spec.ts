import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeatmapPageComponent } from './heatmap-page.component';

describe('HeatmapPageComponent', () => {
  let component: HeatmapPageComponent;
  let fixture: ComponentFixture<HeatmapPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeatmapPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeatmapPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
