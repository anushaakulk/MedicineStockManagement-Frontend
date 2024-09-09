import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddorderDetailsComponent } from './addorder-details.component';

describe('AddorderDetailsComponent', () => {
  let component: AddorderDetailsComponent;
  let fixture: ComponentFixture<AddorderDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddorderDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddorderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
