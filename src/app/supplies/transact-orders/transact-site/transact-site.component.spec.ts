import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactSiteComponent } from './transact-site.component';

describe('TransactSiteComponent', () => {
  let component: TransactSiteComponent;
  let fixture: ComponentFixture<TransactSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactSiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
