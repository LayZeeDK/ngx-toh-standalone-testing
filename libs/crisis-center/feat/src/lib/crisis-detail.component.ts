import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  provideLocalRouterStore,
  RouterStore,
} from '@ngworker/router-component-store';
import { Observable } from 'rxjs';

import { Crisis } from './crisis';
import { DialogService } from './dialog.service';

@Component({
  selector: 'toh-crisis-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div *ngIf="crisis">
      <h3>"{{ editName }}"</h3>
      <div><label>Id: </label>{{ crisis.id }}</div>
      <div>
        <label>Name: </label>
        <input [(ngModel)]="editName" placeholder="name" />
      </div>
      <p>
        <button (click)="save()">Save</button>
        <button (click)="cancel()">Cancel</button>
      </p>
    </div>
  `,
  styles: [
    `
      input {
        width: 20em;
      }
    `,
  ],
  providers: [provideLocalRouterStore()],
})
export class CrisisDetailComponent implements OnInit {
  crisis: Crisis = {
    id: -1,
    name: '',
  };
  editName = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public dialogService: DialogService,
    private routerStore: RouterStore
  ) {}

  ngOnInit() {
    this.routerStore.routeData$.subscribe((data) => {
      const crisis: Crisis = data['crisis'];
      this.editName = crisis.name;
      this.crisis = crisis;
    });
  }

  cancel() {
    this.gotoCrises();
  }

  save() {
    this.crisis.name = this.editName;
    this.gotoCrises();
  }

  canDeactivate(): Observable<boolean> | boolean {
    // Allow synchronous navigation (`true`) if no crisis or the crisis is unchanged
    if (!this.crisis || this.crisis.name === this.editName) {
      return true;
    }
    // Otherwise ask the user with the dialog service and return its
    // observable which resolves to true or false when the user decides
    return this.dialogService.confirm('Discard changes?');
  }

  gotoCrises() {
    const crisisId = this.crisis ? this.crisis.id : null;
    // Pass along the crisis id if available
    // so that the CrisisListComponent can select that crisis.
    // Add a totally useless `foo` parameter for kicks.
    // Relative navigation back to the crises
    this.router.navigate(['../', { id: crisisId, foo: 'foo' }], {
      relativeTo: this.route,
    });
  }
}
