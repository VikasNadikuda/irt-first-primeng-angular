import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsStrategyComponent } from './settings-strategy.component';

describe('SettingsStrategyComponent', () => {
  let component: SettingsStrategyComponent;
  let fixture: ComponentFixture<SettingsStrategyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsStrategyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsStrategyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
