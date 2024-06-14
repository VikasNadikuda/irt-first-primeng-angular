import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactHomeComponent } from './transact-home.component';

describe('TransactHomeComponent', () => {
  let component: TransactHomeComponent;
  let fixture: ComponentFixture<TransactHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
