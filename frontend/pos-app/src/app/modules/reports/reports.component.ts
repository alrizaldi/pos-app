import { Component } from '@angular/core';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [],
  template: `
    <div class="container">
      <div class="header">
        <h2>Reports</h2>
        <div class="export-buttons">
          <button class="btn btn-secondary">Export to Excel</button>
          <button class="btn btn-secondary">Export to PDF</button>
        </div>
      </div>
      
      <div class="filters">
        <div class="filter-group">
          <label for="report-type">Report Type:</label>
          <select id="report-type" class="form-control">
            <option>Sales Report</option>
            <option>Product Performance</option>
            <option>Cashier Sessions</option>
            <option>Low Stock Alert</option>
            <option>Discount Usage</option>
          </select>
        </div>
        
        <div class="filter-group">
          <label for="date-range">Date Range:</label>
          <select id="date-range" class="form-control">
            <option>Today</option>
            <option>This Week</option>
            <option>This Month</option>
            <option>Last Month</option>
            <option>Custom Range</option>
          </select>
        </div>
        
        <div class="filter-group">
          <label for="store">Store:</label>
          <select id="store" class="form-control">
            <option>All Stores</option>
            <option>Main Store</option>
            <option>Downtown Location</option>
          </select>
        </div>
        
        <div class="filter-group">
          <label>&nbsp;</label>
          <button class="btn btn-primary">Generate Report</button>
        </div>
      </div>
      
      <div class="report-preview">
        <h3>Sales Report - June 2023</h3>
        
        <div class="summary-cards">
          <div class="card summary-card">
            <h4>Total Sales</h4>
            <p class="value">$24,560.75</p>
            <p class="change positive">+15.2% from last month</p>
          </div>
          
          <div class="card summary-card">
            <h4>Transactions</h4>
            <p class="value">1,248</p>
            <p class="change positive">+8.7% from last month</p>
          </div>
          
          <div class="card summary-card">
            <h4>Avg. Basket Size</h4>
            <p class="value">$19.68</p>
            <p class="change negative">-2.1% from last month</p>
          </div>
          
          <div class="card summary-card">
            <h4>Top Product</h4>
            <p class="value">Coffee</p>
            <p class="change">PRD001 - 426 units sold</p>
          </div>
        </div>
        
        <div class="chart-container">
          <h4>Daily Sales Trend</h4>
          <div class="chart-placeholder">
            <p>Sales trend chart would appear here</p>
          </div>
        </div>
        
        <div class="table-responsive">
          <h4>Top Selling Products</h4>
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Product</th>
                <th>SKU</th>
                <th>Category</th>
                <th>Units Sold</th>
                <th>Revenue</th>
                <th>% of Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Coffee</td>
                <td>PRD001</td>
                <td>Beverages</td>
                <td>426</td>
                <td>$1,065.00</td>
                <td>4.3%</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Sandwich</td>
                <td>PRD002</td>
                <td>Food</td>
                <td>287</td>
                <td>$1,719.13</td>
                <td>7.0%</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Soda</td>
                <td>PRD003</td>
                <td>Beverages</td>
                <td>192</td>
                <td>$382.08</td>
                <td>1.6%</td>
              </tr>
            </tbody>
          </table>
        </div>
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
    
    .export-buttons {
      display: flex;
      gap: 10px;
    }
    
    .filters {
      display: flex;
      gap: 15px;
      margin-bottom: 20px;
      flex-wrap: wrap;
      align-items: end;
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
    
    .summary-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      margin-bottom: 30px;
    }
    
    .card {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      overflow: hidden;
    }
    
    .summary-card {
      padding: 20px;
      text-align: center;
    }
    
    .summary-card h4 {
      margin: 0 0 10px 0;
      color: #6c757d;
      font-size: 1rem;
    }
    
    .summary-card .value {
      margin: 0 0 10px 0;
      font-size: 1.5rem;
      font-weight: bold;
      color: #343a40;
    }
    
    .change {
      margin: 0;
      font-size: 0.9rem;
    }
    
    .positive {
      color: #28a745;
    }
    
    .negative {
      color: #dc3545;
    }
    
    .chart-container {
      margin-bottom: 30px;
    }
    
    .chart-container h4 {
      margin-bottom: 15px;
      color: #343a40;
    }
    
    .chart-placeholder {
      height: 300px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f8f9fa;
      border-radius: 4px;
    }
    
    .chart-placeholder p {
      color: #6c757d;
      margin: 0;
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
  `]
})
export class ReportsComponent {
  constructor() { }
}