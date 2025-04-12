import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignOverviewPageComponent } from './campaign-overview-page.component';

describe('CampaignOverviewPageComponent', () => {
  let component: CampaignOverviewPageComponent;
  let fixture: ComponentFixture<CampaignOverviewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [CampaignOverviewPageComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(CampaignOverviewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
