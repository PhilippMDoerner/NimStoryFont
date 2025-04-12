import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpellsTemplateComponent } from './spells-template.component';

describe('SpellsTemplateComponent', () => {
  let component: SpellsTemplateComponent;
  let fixture: ComponentFixture<SpellsTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [SpellsTemplateComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(SpellsTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
