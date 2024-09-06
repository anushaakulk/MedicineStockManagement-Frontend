// feedback.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';  // Required for ngModel
import { FeedbackComponent } from './feedback.component';

describe('FeedbackComponent', () => {
    let component: FeedbackComponent;
    let fixture: ComponentFixture<FeedbackComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ FeedbackComponent ],
            imports: [ FormsModule ]  // Import FormsModule for ngModel
        })
        .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FeedbackComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should show alert when submitting feedback', () => {
        spyOn(window, 'alert');
        component.submitFeedback();
        expect(window.alert).toHaveBeenCalledWith('Please provide a rating and feedback.');
        
        component.rating = 5;
        component.feedback = 'Great app!';
        component.submitFeedback();
        expect(window.alert).toHaveBeenCalledWith('Thank you for your feedback!');
    });
});

