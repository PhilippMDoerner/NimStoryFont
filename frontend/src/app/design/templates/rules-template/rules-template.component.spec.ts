import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RulesTemplateComponent } from './rules-template.component';

describe('RulesTemplateComponent', () => {
  let component: RulesTemplateComponent;
  let fixture: ComponentFixture<RulesTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [RulesTemplateComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(RulesTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
