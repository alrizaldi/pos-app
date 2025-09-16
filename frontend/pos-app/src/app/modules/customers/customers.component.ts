import { Component } from '@angular/core';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [],
  template: `
    <div class="container">
      <div class="header">
        <h2>Customers</h2>
        <button class="btn btn-primary">Add New Customer</button>
      </div>
      
      <div class="filters">
        <div class="filter-group">
          <input type="text" class="form-control" placeholder="Search customers...">
        </div>
      </div>
      
      <div class="table-responsive">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Member Since</th>
              <th>Points</th>
              <th>Tier</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>John Smith</td>
              <td>(555) 123-4567</td>
              <td>john.smith@email.com</td>
              <td>2023-01-15</td>
              <td>450</td>
              <td><span class="tier-badge tier-gold">Gold</span></td>
              <td>
                <button class="btn btn-sm btn-primary">View</button>
                <button class="btn btn-sm btn-secondary">Edit</button>
              </td>
            </tr>
            <tr>
              <td>Jane Doe</td>
              <td>(555) 987-6543</td>
              <td>jane.doe@email.com</td>
              <td>2023-03-22</td>
              <td>120</td>
              <td><span class="tier-badge tier-silver">Silver</span></td>
              <td>
                <button class="btn btn-sm btn-primary">View</button>
                <button class="btn btn-sm btn-secondary">Edit</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
    }
    
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }
    
    .header h2 {
      margin: 0;
      color: #343a40;
    }
    
    .filters {
      display: flex;
      gap: 15px;
      margin-bottom: 20px;
    }
    
    .filter-group {
      display: flex;
      flex-direction: column;
    }
    
    .form-control {
      padding: 0.375rem 0.75rem;
      font-size: 1rem;
      line-height: 1.5;
      color: #495057;
      background-color: #fff;
      background-clip: padding-box;
      border: 1px solid #ced4da;
      border-radius: 0.25rem;
      transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    }
    
    .table-responsive {
      overflow-x: auto;
    }
    
    .table {
      width: 100%;
      max-width: 100%;
      margin-bottom: 1rem;
      background-color: transparent;
      border-collapse: collapse;
    }
    
    .table th,
    .table td {
      padding: 0.75rem;
      vertical-align: top;
      border-top: 1px solid #dee2e6;
    }
    
    .table thead th {
      vertical-align: bottom;
      border-bottom: 2px solid #dee2e6;
      background-color: #f8f9fa;
    }
    
    .table-striped tbody tr:nth-of-type(odd) {
      background-color: rgba(0, 0, 0, 0.05);
    }
    
    .tier-badge {
      padding: 0.25em 0.4em;
      font-size: 75%;
      font-weight: 700;
      line-height: 1;
      text-align: center;
      white-space: nowrap;
      vertical-align: baseline;
      border-radius: 0.25rem;
    }
    
    .tier-gold {
      color: #000;
      background-color: #ffd700;
    }
    
    .tier-silver {
      color: #000;
      background-color: #c0c0c0;
    }
    
    .tier-bronze {
      color: #000;
      background-color: #cd7f32;
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
    
    .btn-secondary {
      color: #fff;
      background-color: #6c757d;
      border-color: #6c757d;
    }
    
    .btn-secondary:hover {
      color: #fff;
      background-color: #5a6268;
      border-color: #545b62;
    }
    
    .btn-sm {
      padding: 0.25rem 0.5rem;
      font-size: 0.875rem;
      border-radius: 0.2rem;
      margin-right: 5px;
    }
  `]
})
export class CustomersComponent {
  constructor() { }
}