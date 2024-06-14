import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsAllocationComponent } from './settings-allocation.component';

describe('SettingsAllocationComponent', () => {
  let component: SettingsAllocationComponent;
  let fixture: ComponentFixture<SettingsAllocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsAllocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
