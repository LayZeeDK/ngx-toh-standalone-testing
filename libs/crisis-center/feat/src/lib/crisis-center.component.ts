import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'toh-crisis-center',
  standalone: true,
  imports: [RouterModule],
  template: `
    <h2>CRISIS CENTER</h2>
    <router-outlet></router-outlet>
  `,
  styles: [],
})
export class CrisisCenterComponent {}
