import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationTemplateComponent } from './location-template.component';

describe('LocationTemplateComponent', () => {
  let component: LocationTemplateComponent;
  let fixture: ComponentFixture<LocationTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [LocationTemplateComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(LocationTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
