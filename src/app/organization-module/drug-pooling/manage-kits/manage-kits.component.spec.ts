import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageKitsComponent } from './manage-kits.component';

describe('ManageKitsComponent', () => {
  let component: ManageKitsComponent;
  let fixture: ComponentFixture<ManageKitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageKitsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageKitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
