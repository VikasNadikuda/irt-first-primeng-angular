import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateRandomComponent } from './generate-random.component';

describe('GenerateRandomComponent', () => {
  let component: GenerateRandomComponent;
  let fixture: ComponentFixture<GenerateRandomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerateRandomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateRandomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
