import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpellComponent } from './spell.component';

describe('SpellComponent', () => {
  let component: SpellComponent;
  let fixture: ComponentFixture<SpellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [SpellComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(SpellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
