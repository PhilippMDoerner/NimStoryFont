import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectableEntryComponent } from './selectable-entry.component';

describe('SelectableEntryComponent', () => {
  let component: SelectableEntryComponent;
  let fixture: ComponentFixture<SelectableEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectableEntryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectableEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
