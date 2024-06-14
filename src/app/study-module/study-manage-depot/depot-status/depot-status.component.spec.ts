import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepotStatusComponent } from './depot-status.component';

describe('DepotStatusComponent', () => {
  let component: DepotStatusComponent;
  let fixture: ComponentFixture<DepotStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepotStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepotStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
