import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsAccComponent } from './settings-acc.component';

describe('SettingsAccComponent', () => {
  let component: SettingsAccComponent;
  let fixture: ComponentFixture<SettingsAccComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsAccComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsAccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
