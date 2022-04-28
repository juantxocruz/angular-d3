import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresenceTotalComponent } from './presence-total.component';

describe('PresenceTotalComponent', () => {
  let component: PresenceTotalComponent;
  let fixture: ComponentFixture<PresenceTotalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresenceTotalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PresenceTotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
