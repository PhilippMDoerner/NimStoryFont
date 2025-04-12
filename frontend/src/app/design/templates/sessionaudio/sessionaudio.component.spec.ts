import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionaudioComponent } from './sessionaudio.component';

describe('SessionaudioComponent', () => {
  let component: SessionaudioComponent;
  let fixture: ComponentFixture<SessionaudioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [SessionaudioComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(SessionaudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
