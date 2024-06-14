import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitListsComponent } from './kit-lists.component';

describe('KitListsComponent', () => {
  let component: KitListsComponent;
  let fixture: ComponentFixture<KitListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KitListsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KitListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
