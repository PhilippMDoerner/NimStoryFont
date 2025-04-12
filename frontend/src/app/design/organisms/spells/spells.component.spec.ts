import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpellsComponent } from './spells.component';

describe('SpellsComponentComponent', () => {
  let component: SpellsComponent;
  let fixture: ComponentFixture<SpellsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [SpellsComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(SpellsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
