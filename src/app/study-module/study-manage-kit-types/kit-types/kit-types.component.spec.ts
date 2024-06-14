import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitTypesComponent } from './kit-types.component';

describe('KitTypesComponent', () => {
  let component: KitTypesComponent;
  let fixture: ComponentFixture<KitTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KitTypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KitTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
