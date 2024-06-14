import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsInventoryComponent } from './settings-inventory.component';

describe('SettingsInventoryComponent', () => {
  let component: SettingsInventoryComponent;
  let fixture: ComponentFixture<SettingsInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsInventoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
