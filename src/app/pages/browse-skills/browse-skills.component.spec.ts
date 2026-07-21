import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseSkillsComponent } from './browse-skills.component';

describe('BrowseSkillsComponent', () => {
  let component: BrowseSkillsComponent;
  let fixture: ComponentFixture<BrowseSkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowseSkillsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrowseSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
