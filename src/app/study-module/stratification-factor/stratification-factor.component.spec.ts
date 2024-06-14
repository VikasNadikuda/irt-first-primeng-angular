import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StratificationFactorComponent } from './stratification-factor.component';

describe('StratificationFactorComponent', () => {
  let component: StratificationFactorComponent;
  let fixture: ComponentFixture<StratificationFactorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StratificationFactorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StratificationFactorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
