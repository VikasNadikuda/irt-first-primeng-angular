import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactDepotsComponent } from './transact-depots.component';

describe('TransactDepotsComponent', () => {
  let component: TransactDepotsComponent;
  let fixture: ComponentFixture<TransactDepotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactDepotsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactDepotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
