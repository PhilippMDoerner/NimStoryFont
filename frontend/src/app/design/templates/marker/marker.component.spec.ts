import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkerComponent } from './marker.component';

describe('MarkerComponent', () => {
  let component: MarkerComponent;
  let fixture: ComponentFixture<MarkerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [MarkerComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(MarkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
