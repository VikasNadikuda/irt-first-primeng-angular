import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsEditAllocationComponent } from './settings-edit-allocation.component';

describe('SettingsEditAllocationComponent', () => {
  let component: SettingsEditAllocationComponent;
  let fixture: ComponentFixture<SettingsEditAllocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsEditAllocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsEditAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
