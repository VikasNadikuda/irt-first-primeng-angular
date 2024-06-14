import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepotKitsComponent } from './depot-kits.component';

describe('DepotKitsComponent', () => {
  let component: DepotKitsComponent;
  let fixture: ComponentFixture<DepotKitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepotKitsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepotKitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
