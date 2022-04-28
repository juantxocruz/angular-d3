import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresenceGenderComponent } from './presence-gender.component';

describe('PresenceGenderComponent', () => {
  let component: PresenceGenderComponent;
  let fixture: ComponentFixture<PresenceGenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresenceGenderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PresenceGenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
