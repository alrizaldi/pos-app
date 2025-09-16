import { Component } from '@angular/core';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [],
  template: `
    <div class="container">
      <div class="header">
        <h2>Settings</h2>
      </div>
      
      <div class="settings-grid">
        <div class="card settings-card">
          <div class="card-header">
            <h3>Store Settings</h3>
          </div>
          <div class="card-body">
            <p>Manage your store information, locations, and configurations.</p>
            <button class="btn btn-primary">Manage Stores</button>
          </div>
        </div>
        
        <div class="card settings-card">
          <div class="card-header">
            <h3>User Management</h3>
          </div>
          <div class="card-body">
            <p>Add, edit, or remove users and assign roles and permissions.</p>
            <button class="btn btn-primary">Manage Users</button>
          </div>
        </div>
        
        <div class="card settings-card">
          <div class="card-header">
            <h3>Product Catalog</h3>
          </div>
          <div class="card-body">
            <p>Manage product categories, suppliers, and pricing.</p>
            <button class="btn btn-primary">Manage Products</button>
          </div>
        </div>
        
        <div class="card settings-card">
          <div class="card-header">
            <h3>Payment Methods</h3>
          </div>
          <div class="card-body">
            <p>Configure accepted payment methods and gateways.</p>
            <button class="btn btn-primary">Manage Payments</button>
          </div>
        </div>
        
        <div class="card settings-card">
          <div class="card-header">
            <h3>Discounts & Promotions</h3>
          </div>
          <div class="card-body">
            <p>Create and manage discounts, coupons, and promotional rules.</p>
            <button class="btn btn-primary">Manage Discounts</button>
          </div>
        </div>
        
        <div class="card settings-card">
          <div class="card-header">
            <h3>Reports & Analytics</h3>
          </div>
          <div class="card-body">
            <p>Configure report schedules and data export settings.</p>
            <button class="btn btn-primary">Manage Reports</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
    }
    
    .header {
      margin-bottom: 20px;
    }
    
    .header h2 {
      margin: 0;
      color: #343a40;
    }
    
    .settings-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
    }
    
    .card {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      overflow: hidden;
    }
    
    .card-header {
      padding: 15px 20px;
      background-color: #f8f9fa;
      border-bottom: 1px solid #dee2e6;
    }
    
    .card-header h3 {
      margin: 0;
      color: #495057;
      font-size: 1.25rem;
    }
    
    .card-body {
      padding: 20px;
    }
    
    .card-body p {
      color: #6c757d;
      margin-bottom: 20px;
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
export class SettingsComponent {
  constructor() { }
}