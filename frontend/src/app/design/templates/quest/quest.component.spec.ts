import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestComponent } from './quest.component';

describe('QuestComponent', () => {
  let component: QuestComponent;
  let fixture: ComponentFixture<QuestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [QuestComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(QuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
