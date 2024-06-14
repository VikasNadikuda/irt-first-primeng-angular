import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplyHomeComponent } from './supply-home.component';

describe('SupplyHomeComponent', () => {
  let component: SupplyHomeComponent;
  let fixture: ComponentFixture<SupplyHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplyHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplyHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
