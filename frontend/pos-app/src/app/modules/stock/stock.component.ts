import { Component } from '@angular/core';

@Component({
  selector: 'app-stock',
  standalone: true,
  imports: [],
  template: `
    <div class="container">
      <div class="header">
        <h2>Stock Management</h2>
        <div class="actions">
          <button class="btn btn-primary">Adjust Stock</button>
          <button class="btn btn-secondary">Stock Transfer</button>
        </div>
      </div>
      
      <div class="filters">
        <div class="filter-group">
          <label for="store">Store:</label>
          <select id="store" class="form-control">
            <option>All Stores</option>
            <option>Main Store</option>
            <option>Downtown Location</option>
          </select>
        </div>
        
        <div class="filter-group">
          <label for="category">Category:</label>
          <select id="category" class="form-control">
            <option>All Categories</option>
            <option>Beverages</option>
            <option>Food</option>
            <option>Merchandise</option>
          </select>
        </div>
        
        <div class="filter-group">
          <input type="text" class="form-control" placeholder="Search products...">
        </div>
      </div>
      
      <div class="table-responsive">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>SKU</th>
              <th>Product Name</th>
              <th>Category</th>
              <th>Store</th>
              <th>On Hand</th>
              <th>Reserved</th>
              <th>Available</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>PRD001</td>
              <td>Coffee</td>
              <td>Beverages</td>
              <td>Main Store</td>
              <td>25</td>
              <td>5</td>
              <td>20</td>
              <td><span class="status-badge status-ok">OK</span></td>
              <td>
                <button class="btn btn-sm btn-primary">Adjust</button>
              </td>
            </tr>
            <tr>
              <td>PRD002</td>
              <td>Sandwich</td>
              <td>Food</td>
              <td>Main Store</td>
              <td>12</td>
              <td>3</td>
              <td>9</td>
              <td><span class="status-badge status-low">Low Stock</span></td>
              <td>
                <button class="btn btn-sm btn-primary">Adjust</button>
              </td>
            </tr>
            <tr>
              <td>PRD003</td>
              <td>Soda</td>
              <td>Beverages</td>
              <td>Downtown Location</td>
              <td>48</td>
              <td>2</td>
              <td>46</td>
              <td><span class="status-badge status-ok">OK</span></td>
              <td>
                <button class="btn btn-sm btn-primary">Adjust</button>
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
    
    .filters {
      display: flex;
      gap: 15px;
      margin-bottom: 20px;
      flex-wrap: wrap;
    }
    
    .filter-group {
      display: flex;
      flex-direction: column;
    }
    
    .filter-group label {
      font-size: 0.875rem;
      margin-bottom: 5px;
      color: #495057;
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
    
    .status-ok {
      color: #fff;
      background-color: #28a745;
    }
    
    .status-low {
      color: #fff;
      background-color: #ffc107;
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
    }
  `]
})
export class StockComponent {
  constructor() { }
}