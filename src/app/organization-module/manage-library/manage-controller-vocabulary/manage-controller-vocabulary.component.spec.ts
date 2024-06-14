import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageControllerVocabularyComponent } from './manage-controller-vocabulary.component';

describe('ManageControllerVocabularyComponent', () => {
  let component: ManageControllerVocabularyComponent;
  let fixture: ComponentFixture<ManageControllerVocabularyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageControllerVocabularyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageControllerVocabularyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
