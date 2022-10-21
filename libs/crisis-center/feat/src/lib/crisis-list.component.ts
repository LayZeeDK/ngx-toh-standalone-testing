import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RouterStore } from '@ngworker/router-component-store';
import { Observable, switchMap } from 'rxjs';

import { Crisis } from './crisis';
import { CrisisService } from './crisis.service';

@Component({
  selector: 'toh-crisis-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <ul class="crises">
      <li
        *ngFor="let crisis of crises$ | async"
        [class.selected]="crisis.id === selectedId"
      >
        <a [routerLink]="[crisis.id]">
          <span class="badge">{{ crisis.id }}</span
          >{{ crisis.name }}
        </a>
      </li>
    </ul>

    <router-outlet></router-outlet>
  `,
  styles: [
    `
      /* CrisisListComponent's private CSS styles */
      .crises {
        margin: 0 0 2em 0;
        list-style-type: none;
        padding: 0;
        width: 24em;
      }
      .crises li {
        position: relative;
        cursor: pointer;
        background-color: #eee;
        margin: 0.5em;
        padding: 0.3em 0;
        height: 1.6em;
        border-radius: 4px;
      }

      .crises li:hover {
        color: #607d8b;
        background-color: #ddd;
        left: 0.1em;
      }

      .crises a {
        color: #888;
        text-decoration: none;
        display: block;
      }

      .crises a:hover {
        color: #607d8b;
      }

      .crises .badge {
        display: inline-block;
        font-size: small;
        color: white;
        padding: 0.8em 0.7em 0 0.7em;
        background-color: #607d8b;
        line-height: 1em;
        position: relative;
        left: -1px;
        top: -4px;
        height: 1.8em;
        min-width: 16px;
        text-align: right;
        margin-right: 0.8em;
        border-radius: 4px 0 0 4px;
      }

      button {
        background-color: #eee;
        border: none;
        padding: 5px 10px;
        border-radius: 4px;
        cursor: pointer;
        font-family: Arial, sans-serif;
      }

      button:hover {
        background-color: #cfd8dc;
      }

      button.delete {
        position: relative;
        left: 194px;
        top: -32px;
        background-color: gray !important;
        color: white;
      }

      .crises li.selected {
        background-color: #cfd8dc;
        color: white;
      }
      .crises li.selected:hover {
        background-color: #bbd8dc;
      }
    `,
  ],
})
export class CrisisListComponent {
  crises$: Observable<Crisis[]> = this.routerStore
    .selectRouteParam<string | null | undefined>('id')
    .pipe(
      switchMap((id) => {
        this.selectedId = +(id ?? '-1');
        return this.service.getCrises();
      })
    );
  selectedId = -1;

  constructor(
    private service: CrisisService,
    private routerStore: RouterStore
  ) {}
}
