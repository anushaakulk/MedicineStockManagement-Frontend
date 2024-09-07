import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddmedicinelistComponent } from './addmedicinelist.component';

describe('AddmedicinelistComponent', () => {
  let component: AddmedicinelistComponent;
  let fixture: ComponentFixture<AddmedicinelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddmedicinelistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddmedicinelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
