import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navigation',
  template: `
    <div class="sidebar">
      <div class="sidebar-header">
        <h2>POS System</h2>
      </div>
      <nav class="sidebar-menu">
        <a routerLink="/dashboard" routerLinkActive="active" class="nav-link" (click)="onNavClick($event, 'dashboard')">
          <span class="icon">📊</span>
          <span class="link-text">Dashboard</span>
        </a>
        <a routerLink="/stores" routerLinkActive="active" class="nav-link" (click)="onNavClick($event, 'stores')">
          <span class="icon">🏪</span>
          <span class="link-text">Stores</span>
        </a>
        <a routerLink="/products" routerLinkActive="active" class="nav-link" (click)="onNavClick($event, 'products')">
          <span class="icon">📦</span>
          <span class="link-text">Products</span>
        </a>
        <a routerLink="/sales" routerLinkActive="active" class="nav-link" (click)="onNavClick($event, 'sales')">
          <span class="icon">💰</span>
          <span class="link-text">Sales</span>
        </a>
        <a routerLink="/purchasing" routerLinkActive="active" class="nav-link" (click)="onNavClick($event, 'purchasing')">
          <span class="icon">🛒</span>
          <span class="link-text">Purchasing</span>
        </a>
        <a routerLink="/stock" routerLinkActive="active" class="nav-link" (click)="onNavClick($event, 'stock')">
          <span class="icon">📈</span>
          <span class="link-text">Stock</span>
        </a>
        <a routerLink="/customers" routerLinkActive="active" class="nav-link" (click)="onNavClick($event, 'customers')">
          <span class="icon">👥</span>
          <span class="link-text">Customers</span>
        </a>
        <a routerLink="/reports" routerLinkActive="active" class="nav-link" (click)="onNavClick($event, 'reports')">
          <span class="icon">📋</span>
          <span class="link-text">Reports</span>
        </a>
        <a routerLink="/settings" routerLinkActive="active" class="nav-link" (click)="onNavClick($event, 'settings')">
          <span class="icon">⚙️</span>
          <span class="link-text">Settings</span>
        </a>
        <a routerLink="/test" routerLinkActive="active" class="nav-link" (click)="onNavClick($event, 'test')">
          <span class="icon">🧪</span>
          <span class="link-text">Test</span>
        </a>
      </nav>
      <div class="sidebar-footer">
        <button class="btn btn-outline btn-logout" (click)="logout()">
          <span class="icon">🚪</span>
          <span class="link-text">Logout</span>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .sidebar {
      position: fixed;
      top: 0;
      left: 0;
      height: 100vh;
      width: 250px;
      background-color: #343a40;
      color: white;
      display: flex;
      flex-direction: column;
      box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
      z-index: 1000;
      pointer-events: auto;
    }
    
    .sidebar-header {
      padding: 1rem;
      background-color: #212529;
      text-align: center;
      border-bottom: 1px solid #495057;
    }
    
    .sidebar-header h2 {
      margin: 0;
      color: white;
      font-size: 1.5rem;
    }
    
    .sidebar-menu {
      flex: 1;
      padding: 1rem 0;
      overflow-y: auto;
    }
    
    .nav-link {
      display: flex;
      align-items: center;
      padding: 0.75rem 1rem;
      color: rgba(255, 255, 255, 0.75);
      text-decoration: none;
      transition: all 0.2s;
      border-left: 3px solid transparent;
      cursor: pointer;
      pointer-events: auto;
    }
    
    .nav-link:hover,
    .nav-link.active {
      color: white;
      background-color: rgba(255, 255, 255, 0.1);
      border-left: 3px solid #007bff;
    }
    
    .nav-link .icon {
      font-size: 1.2rem;
      margin-right: 0.75rem;
      width: 24px;
      text-align: center;
    }
    
    .nav-link .link-text {
      font-size: 1rem;
    }
    
    .sidebar-footer {
      padding: 1rem;
      border-top: 1px solid #495057;
    }
    
    .btn {
      display: inline-flex;
      align-items: center;
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1rem;
      width: 100%;
      justify-content: flex-start;
      pointer-events: auto;
    }
    
    .btn-outline {
      background-color: transparent;
      color: white;
      border: 1px solid white;
    }
    
    .btn-outline:hover {
      background-color: white;
      color: #343a40;
    }
    
    .btn-logout .icon {
      font-size: 1.2rem;
      margin-right: 0.75rem;
      width: 24px;
      text-align: center;
    }
    
    .btn-logout .link-text {
      font-size: 1rem;
    }
    
    @media (max-width: 768px) {
      .sidebar {
        width: 70px;
      }
      
      .sidebar-header h2,
      .nav-link .link-text,
      .btn-logout .link-text {
        display: none;
      }
      
      .sidebar-header {
        padding: 1rem 0;
      }
      
      .sidebar-header h2 {
        font-size: 1rem;
      }
      
      .nav-link,
      .btn-logout {
        justify-content: center;
        padding: 1rem 0;
      }
      
      .nav-link .icon,
      .btn-logout .icon {
        margin-right: 0;
        font-size: 1.5rem;
      }
    }
  `]
})
export class NavigationComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  onNavClick(event: Event, link: string): void {
    console.log('Navigation link clicked:', link);
    event.preventDefault();
    this.router.navigate([`/${link}`]);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}