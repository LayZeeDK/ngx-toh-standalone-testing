import { Component } from '@angular/core';
import { ChildrenOutletContexts, RouterModule } from '@angular/router';
import { slideInAnimation } from './animations';

@Component({
  selector: 'toh-app',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="wrapper">
      <h1 class="title">{{ title }}</h1>
      <nav>
        <a
          routerLink="/crisis-center"
          routerLinkActive="active"
          ariaCurrentWhenActive="page"
          >Crisis Center</a
        >
        <!-- <a
          routerLink="/superheroes"
          routerLinkActive="active"
          ariaCurrentWhenActive="page"
          >Heroes</a
        > -->
        <!-- <a
          routerLink="/admin"
          routerLinkActive="active"
          ariaCurrentWhenActive="page"
          >Admin</a
        > -->
        <!-- <a
          routerLink="/login"
          routerLinkActive="active"
          ariaCurrentWhenActive="page"
          >Login</a
        > -->
        <a [routerLink]="[{ outlets: { popup: ['compose'] } }]">Contact</a>
      </nav>
      <div [@routeAnimation]="getRouteAnimationData()">
        <router-outlet></router-outlet>
      </div>
      <router-outlet name="popup"></router-outlet>
    </div>
  `,
  styles: [
    `
      nav a {
        padding: 1rem;
      }
    `,
  ],
  animations: [slideInAnimation],
})
export class AppComponent {
  title = 'Tour of Heroes';

  constructor(private contexts: ChildrenOutletContexts) {}

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.[
      'animation'
    ];
  }
}
