import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestOverviewComponent } from './quest-overview.component';

describe('QuestOverviewComponent', () => {
  let component: QuestOverviewComponent;
  let fixture: ComponentFixture<QuestOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [QuestOverviewComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(QuestOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
