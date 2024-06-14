import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrUpdateDepotComponent } from './add-or-update-depot.component';

describe('AddOrUpdateDepotComponent', () => {
  let component: AddOrUpdateDepotComponent;
  let fixture: ComponentFixture<AddOrUpdateDepotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOrUpdateDepotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrUpdateDepotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
