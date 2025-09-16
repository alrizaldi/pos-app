import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-purchasing',
  standalone: true,
  imports: [],
  template: `
    <div class="container">
      <div class="header">
        <h2>Purchasing</h2>
        <button class="btn btn-primary" (click)="createPurchaseOrder()">Create Purchase Order</button>
      </div>
      
      <div class="tabs">
        <button class="tab-button active">Purchase Orders</button>
        <button class="tab-button">Suppliers</button>
        <button class="tab-button">Reports</button>
      </div>
      
      <div class="table-responsive">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>PO Number</th>
              <th>Supplier</th>
              <th>Date</th>
              <th>Status</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>PO-001</td>
              <td>ABC Supply Co.</td>
              <td>2023-06-15</td>
              <td><span class="status-badge status-pending">Pending</span></td>
              <td>$1,250.00</td>
              <td>
                <button class="btn btn-sm btn-primary">View</button>
                <button class="btn btn-sm btn-secondary">Edit</button>
              </td>
            </tr>
            <tr>
              <td>PO-002</td>
              <td>XYZ Distributors</td>
              <td>2023-06-10</td>
              <td><span class="status-badge status-received">Received</span></td>
              <td>$2,100.50</td>
              <td>
                <button class="btn btn-sm btn-primary">View</button>
                <button class="btn btn-sm btn-secondary">Edit</button>
              </td>
            </tr>
            <tr>
              <td>PO-003</td>
              <td>Global Foods Inc.</td>
              <td>2023-06-05</td>
              <td><span class="status-badge status-ordered">Ordered</span></td>
              <td>$875.25</td>
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
    
    .status-pending {
      color: #fff;
      background-color: #ffc107;
    }
    
    .status-ordered {
      color: #fff;
      background-color: #17a2b8;
    }
    
    .status-received {
      color: #fff;
      background-color: #28a745;
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
export class PurchasingComponent {
  constructor(private router: Router) { }

  createPurchaseOrder(): void {
    // Navigate to create purchase order page
    this.router.navigate(['/purchasing/new']);
  }
}