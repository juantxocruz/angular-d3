import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupedVerticalBarchartComponent } from './grouped-vertical-barchart.component';

describe('GroupedVerticalBarchartComponent', () => {
  let component: GroupedVerticalBarchartComponent;
  let fixture: ComponentFixture<GroupedVerticalBarchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GroupedVerticalBarchartComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupedVerticalBarchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
