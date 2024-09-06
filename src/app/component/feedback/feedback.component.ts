// feedback.component.ts
import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
@Component({
    selector: 'app-feedback',
    templateUrl: './feedback.component.html',
    styleUrls: ['./feedback.component.css'],
    imports:[FormsModule],
    standalone:true
})
export class FeedbackComponent {
    rating: number | null = null;
    feedback: string = '';

    submitFeedback() {
        if (this.rating === null || this.feedback.trim() === '') {
            alert('Please provide a rating and feedback.');
            return;
        }
        
        // Here you can add logic to handle feedback submission, such as sending it to a server
        alert('Thank you for your feedback!');
        
        // Reset the form after submission
        this.rating = null;
        this.feedback = '';
    }
}

