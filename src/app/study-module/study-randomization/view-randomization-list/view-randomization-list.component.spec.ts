import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRandomizationListComponent } from './view-randomization-list.component';

describe('ViewRandomizationListComponent', () => {
  let component: ViewRandomizationListComponent;
  let fixture: ComponentFixture<ViewRandomizationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewRandomizationListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRandomizationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
