import { Component } from '@angular/core';

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [],
  template: `
    <div class="container">
      <div class="header">
        <h2>Sales</h2>
        <div class="actions">
          <button class="btn btn-primary">Open Cashier Session</button>
          <button class="btn btn-secondary">Create Order</button>
        </div>
      </div>
      
      <div class="tabs">
        <button class="tab-button active">Active Sessions</button>
        <button class="tab-button">Recent Orders</button>
        <button class="tab-button">Cashier Reports</button>
      </div>
      
      <div class="table-responsive">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Session ID</th>
              <th>Store</th>
              <th>Cashier</th>
              <th>Start Time</th>
              <th>Status</th>
              <th>Opening Balance</th>
              <th>Sales</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>CS-001</td>
              <td>Main Store</td>
              <td>John Doe</td>
              <td>2023-06-15 08:00 AM</td>
              <td><span class="status-badge status-active">Active</span></td>
              <td>$100.00</td>
              <td>$1,250.50</td>
              <td>
                <button class="btn btn-sm btn-primary">View</button>
                <button class="btn btn-sm btn-warning">Close</button>
              </td>
            </tr>
            <tr>
              <td>CS-002</td>
              <td>Downtown Location</td>
              <td>Jane Smith</td>
              <td>2023-06-15 09:30 AM</td>
              <td><span class="status-badge status-active">Active</span></td>
              <td>$150.00</td>
              <td>$980.25</td>
              <td>
                <button class="btn btn-sm btn-primary">View</button>
                <button class="btn btn-sm btn-warning">Close</button>
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
    
    .actions {
      display: flex;
      gap: 10px;
    }
    
    .tabs {
      display: flex;
      margin-bottom: 20px;
      border-bottom: 1px solid #dee2e6;
    }
    
    .tab-button {
      padding: 10px 20px;
      background: none;
      border: none;
      border-bottom: 3px solid transparent;
      cursor: pointer;
      font-size: 1rem;
      color: #6c757d;
    }
    
    .tab-button.active {
      color: #007bff;
      border-bottom: 3px solid #007bff;
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
    
    .status-badge {
      padding: 0.25em 0.4em;
      font-size: 75%;
      font-weight: 700;
      line-height: 1;
      text-align: center;
      white-space: nowrap;
      vertical-align: baseline;
      border-radius: 0.25rem;
    }
    
    .status-active {
      color: #fff;
      background-color: #28a745;
    }
    
    .status-closed {
      color: #fff;
      background-color: #6c757d;
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
    
    .btn-warning {
      color: #212529;
      background-color: #ffc107;
      border-color: #ffc107;
    }
    
    .btn-warning:hover {
      color: #212529;
      background-color: #e0a800;
      border-color: #d39e00;
    }
    
    .btn-sm {
      padding: 0.25rem 0.5rem;
      font-size: 0.875rem;
      border-radius: 0.2rem;
      margin-right: 5px;
    }
  `]
})
export class SalesComponent {
  constructor() { }
}