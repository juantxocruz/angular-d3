import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresenceStatsComponent } from './presence-stats.component';

describe('PresenceStatsComponent', () => {
  let component: PresenceStatsComponent;
  let fixture: ComponentFixture<PresenceStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresenceStatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PresenceStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
