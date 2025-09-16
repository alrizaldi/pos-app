import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from './shared/navigation.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavigationComponent],
  template: `
    <app-navigation></app-navigation>
    <div class="main-content">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    :host {
      display: flex;
      pointer-events: auto;
    }
    
    .main-content {
      flex: 1;
      margin-left: 250px;
      padding: 20px;
      min-height: 100vh;
      pointer-events: auto;
    }
    
    @media (max-width: 768px) {
      .main-content {
        margin-left: 70px;
      }
    }
  `]
})
export class AppComponent {
  title = 'pos-app';
  
  constructor() {
    console.log('AppComponent initialized');
  }
}