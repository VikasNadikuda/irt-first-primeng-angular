import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsDispenseComponent } from './settings-dispense.component';

describe('SettingsDispenseComponent', () => {
  let component: SettingsDispenseComponent;
  let fixture: ComponentFixture<SettingsDispenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsDispenseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsDispenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
