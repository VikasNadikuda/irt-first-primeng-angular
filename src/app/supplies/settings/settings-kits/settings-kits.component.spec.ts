import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsKitsComponent } from './settings-kits.component';

describe('SettingsKitsComponent', () => {
  let component: SettingsKitsComponent;
  let fixture: ComponentFixture<SettingsKitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsKitsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsKitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
