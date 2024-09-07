import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddinventoriesComponent } from './addinventories.component';

describe('AddinventoriesComponent', () => {
  let component: AddinventoriesComponent;
  let fixture: ComponentFixture<AddinventoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddinventoriesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddinventoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
