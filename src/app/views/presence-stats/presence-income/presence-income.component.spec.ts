import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresenceIncomeComponent } from './presence-income.component';

describe('PresenceIncomeComponent', () => {
  let component: PresenceIncomeComponent;
  let fixture: ComponentFixture<PresenceIncomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresenceIncomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PresenceIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
