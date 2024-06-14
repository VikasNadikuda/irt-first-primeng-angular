import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStudiesComponent } from './view-studies.component';

describe('ViewStudiesComponent', () => {
  let component: ViewStudiesComponent;
  let fixture: ComponentFixture<ViewStudiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewStudiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewStudiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
