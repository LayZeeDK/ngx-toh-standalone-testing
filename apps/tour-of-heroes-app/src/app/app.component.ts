import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'toh-app',
  standalone: true,
  imports: [RouterModule],
  template: `<router-outlet></router-outlet>`,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class AppComponent {}
