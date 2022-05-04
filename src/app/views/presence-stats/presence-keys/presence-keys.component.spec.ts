import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresenceKeysComponent } from './presence-keys.component';

describe('PresenceKeysComponent', () => {
  let component: PresenceKeysComponent;
  let fixture: ComponentFixture<PresenceKeysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresenceKeysComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PresenceKeysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
