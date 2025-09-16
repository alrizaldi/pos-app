import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test',
  standalone: true,
  template: `
    <div class="test-container">
      <h2>Test Component</h2>
      <p>This is a test component to verify routing is working.</p>
      <button class="btn btn-primary" (click)="goToDashboard()">Go to Dashboard</button>
    </div>
  `,
  styles: [`
    .test-container {
      padding: 20px;
    }
    
    .test-container h2 {
      color: #343a40;
    }
    
    .btn {
      display: inline-block;
      font-weight: 400;
      text-align: center;
      white-space: nowrap;
      vertical-align: middle;
      user-select: none;
      border: 1px solid transparent;
      padding: 0.375rem 0.75rem;
      font-size: 1rem;
      line-height: 1.5;
      border-radius: 0.25rem;
      transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
      cursor: pointer;
    }
    
    .btn-primary {
      color: #fff;
      background-color: #007bff;
      border-color: #007bff;
    }
    
    .btn-primary:hover {
      color: #fff;
      background-color: #0069d9;
      border-color: #0062cc;
    }
  `]
})
export class TestComponent {
  constructor(private router: Router) {}

  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}