import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsSupplyComponent } from './settings-supply.component';

describe('SettingsSupplyComponent', () => {
  let component: SettingsSupplyComponent;
  let fixture: ComponentFixture<SettingsSupplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsSupplyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsSupplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
