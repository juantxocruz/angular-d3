import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresenceCardsComponent } from './presence-cards.component';

describe('PresenceCardsComponent', () => {
  let component: PresenceCardsComponent;
  let fixture: ComponentFixture<PresenceCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresenceCardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PresenceCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
