import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MutedStackedbarComponent } from './muted-stackedbar.component';

describe('MutedStackedbarComponent', () => {
  let component: MutedStackedbarComponent;
  let fixture: ComponentFixture<MutedStackedbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MutedStackedbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MutedStackedbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
