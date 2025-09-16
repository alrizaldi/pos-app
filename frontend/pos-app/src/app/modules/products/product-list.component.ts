import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgFor, CurrencyPipe } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [NgFor, CurrencyPipe],
  template: `
    <div class="container">
      <div class="header">
        <h2>Products</h2>
        <button class="btn btn-primary" (click)="createProduct()">Add New Product</button>
      </div>
      
      <div class="table-responsive">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>SKU</th>
              <th>Name</th>
              <th>Description</th>
              <th>Cost Price</th>
              <th>Sell Price</th>
              <th>Stock Tracking</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let product of products">
              <td>{{ product.sku }}</td>
              <td>{{ product.name }}</td>
              <td>{{ product.description }}</td>
              <td>{{ product.cost_price | currency }}</td>
              <td>{{ product.sell_price | currency }}</td>
              <td>
                <span class="badge" [class.badge-success]="product.stock_tracking" [class.badge-secondary]="!product.stock_tracking">
                  {{ product.stock_tracking ? 'Yes' : 'No' }}
                </span>
              </td>
              <td>
                <button class="btn btn-sm btn-primary" (click)="editProduct(product.id)">Edit</button>
                <button class="btn btn-sm btn-danger" (click)="deleteProduct(product.id)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }
    
    .table-responsive {
      overflow-x: auto;
    }
    
    .badge {
      padding: 0.25em 0.4em;
      font-size: 75%;
      font-weight: 700;
      line-height: 1;
      text-align: center;
      white-space: nowrap;
      vertical-align: baseline;
      border-radius: 0.25rem;
    }
    
    .badge-success {
      color: #fff;
      background-color: #28a745;
    }
    
    .badge-secondary {
      color: #fff;
      background-color: #6c757d;
    }
    
    .btn-sm {
      padding: 0.25rem 0.5rem;
      font-size: 0.875rem;
      border-radius: 0.2rem;
      margin-right: 5px;
    }
  `]
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (response) => {
        if (response.success) {
          this.products = response.data;
        }
      },
      error: (error) => {
        console.error('Error loading products:', error);
      }
    });
  }

  createProduct(): void {
    this.router.navigate(['/products/new']);
  }

  editProduct(id: number): void {
    this.router.navigate(['/products', id, 'edit']);
  }

  deleteProduct(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe({
        next: (response) => {
          if (response.success) {
            // Remove the product from the list
            this.products = this.products.filter(product => product.id !== id);
          }
        },
        error: (error) => {
          console.error('Error deleting product:', error);
        }
      });
    }
  }
}