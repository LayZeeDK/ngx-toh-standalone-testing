import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'toh-compose-message',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h3>Contact Crisis Center</h3>
    <div *ngIf="details">
      {{ details }}
    </div>
    <div>
      <div>
        <label for="message">Enter your message: </label>
      </div>
      <div>
        <textarea
          id="message"
          [(ngModel)]="message"
          rows="10"
          cols="35"
          [disabled]="sending"
        ></textarea>
      </div>
    </div>
    <p *ngIf="!sending">
      <button type="button" (click)="send()">Send</button>
      <button type="button" (click)="cancel()">Cancel</button>
    </p>
  `,
  styles: [
    `
      textarea {
        width: 100%;
        margin-top: 1rem;
        font-size: 1.2rem;
        box-sizing: border-box;
      }
    `,
  ],
})
export class ComposeMessageComponent {
  details = '';
  message = '';
  sending = false;

  constructor(private router: Router) {}

  send() {
    this.sending = true;
    this.details = 'Sending Message...';

    setTimeout(() => {
      this.sending = false;
      this.closePopup();
    }, 1000);
  }

  cancel() {
    this.closePopup();
  }

  closePopup() {
    // Providing a `null` value to the named outlet
    // clears the contents of the named outlet
    this.router.navigate([{ outlets: { popup: null } }]);
  }
}
