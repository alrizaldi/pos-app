import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  template: `
    <div class="dashboard-container">
      <h1>Dashboard</h1>
      
      <div class="dashboard-grid">
        <!-- KPI Cards -->
        <div class="card kpi-card">
          <div class="card-header">
            <h3>Today's Sales</h3>
            <span class="icon">💰</span>
          </div>
          <div class="card-body">
            <p class="stat-value">$5,420.50</p>
            <p class="stat-change positive">+12.5% from yesterday</p>
          </div>
        </div>
        
        <div class="card kpi-card">
          <div class="card-header">
            <h3>Transactions</h3>
            <span class="icon">🧾</span>
          </div>
          <div class="card-body">
            <p class="stat-value">86</p>
            <p class="stat-change positive">+8.2% from yesterday</p>
          </div>
        </div>
        
        <div class="card kpi-card">
          <div class="card-header">
            <h3>Avg. Basket</h3>
            <span class="icon">🛒</span>
          </div>
          <div class="card-body">
            <p class="stat-value">$63.03</p>
            <p class="stat-change negative">-2.1% from yesterday</p>
          </div>
        </div>
        
        <div class="card kpi-card">
          <div class="card-header">
            <h3>Low Stock Items</h3>
            <span class="icon">⚠️</span>
          </div>
          <div class="card-body">
            <p class="stat-value">3</p>
            <p class="stat-change neutral">Needs attention</p>
          </div>
        </div>
        
        <!-- Charts -->
        <div class="card chart-card">
          <div class="card-header">
            <h3>Sales Overview</h3>
          </div>
          <div class="card-body">
            <div class="chart-placeholder">
              <p>Sales chart would appear here</p>
            </div>
          </div>
        </div>
        
        <div class="card chart-card">
          <div class="card-header">
            <h3>Top Selling Products</h3>
          </div>
          <div class="card-body">
            <div class="chart-placeholder">
              <p>Product chart would appear here</p>
            </div>
          </div>
        </div>
        
        <!-- Alerts -->
        <div class="card alerts-card">
          <div class="card-header">
            <h3>Recent Alerts</h3>
          </div>
          <div class="card-body">
            <ul class="alerts-list">
              <li class="alert-item">
                <span class="alert-icon warning">⚠️</span>
                <span class="alert-text">Low stock alert for Coffee (PRD001)</span>
              </li>
              <li class="alert-item">
                <span class="alert-icon info">ℹ️</span>
                <span class="alert-text">New order #ORD001234 placed</span>
              </li>
              <li class="alert-item">
                <span class="alert-icon success">✅</span>
                <span class="alert-text">Session closed successfully</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 20px;
    }
    
    .dashboard-container h1 {
      margin-top: 0;
      color: #343a40;
    }
    
    .dashboard-grid {
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
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 20px;
      background-color: #f8f9fa;
      border-bottom: 1px solid #dee2e6;
    }
    
    .card-header h3 {
      margin: 0;
      color: #495057;
      font-size: 1.1rem;
    }
    
    .card-header .icon {
      font-size: 1.5rem;
    }
    
    .card-body {
      padding: 20px;
    }
    
    .kpi-card .stat-value {
      font-size: 2rem;
      font-weight: bold;
      margin: 10px 0;
      color: #343a40;
    }
    
    .stat-change {
      margin: 0;
      font-size: 0.9rem;
    }
    
    .positive {
      color: #28a745;
    }
    
    .negative {
      color: #dc3545;
    }
    
    .neutral {
      color: #6c757d;
    }
    
    .chart-placeholder {
      height: 200px;
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
    
    .alerts-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    
    .alert-item {
      display: flex;
      align-items: center;
      padding: 10px 0;
      border-bottom: 1px solid #eee;
    }
    
    .alert-item:last-child {
      border-bottom: none;
    }
    
    .alert-icon {
      font-size: 1.2rem;
      margin-right: 10px;
    }
    
    .alert-text {
      flex: 1;
    }
    
    .warning {
      color: #ffc107;
    }
    
    .info {
      color: #17a2b8;
    }
    
    .success {
      color: #28a745;
    }
    
    @media (max-width: 768px) {
      .dashboard-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class DashboardComponent implements OnInit {
  constructor() { }

  ngOnInit(): void { }
}