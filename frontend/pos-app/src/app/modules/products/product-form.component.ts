import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm, FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="container">
      <h2>{{ isEditMode ? 'Edit Product' : 'Add New Product' }}</h2>
      
      <form #productForm="ngForm" (ngSubmit)="saveProduct()">
        <div class="form-group">
          <label for="sku">SKU</label>
          <input 
            type="text" 
            id="sku" 
            name="sku" 
            [(ngModel)]="product.sku" 
            class="form-control" 
            required>
        </div>
        
        <div class="form-group">
          <label for="name">Product Name</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            [(ngModel)]="product.name" 
            class="form-control" 
            required>
        </div>
        
        <div class="form-group">
          <label for="description">Description</label>
          <textarea 
            id="description" 
            name="description" 
            [(ngModel)]="product.description" 
            class="form-control" 
            rows="3"></textarea>
        </div>
        
        <div class="form-row">
          <div class="form-group col-md-4">
            <label for="uom">Unit of Measure</label>
            <select 
              id="uom" 
              name="uom" 
              [(ngModel)]="product.uom" 
              class="form-control">
              <option value="each">Each</option>
              <option value="kg">Kilogram</option>
              <option value="g">Gram</option>
              <option value="lb">Pound</option>
              <option value="oz">Ounce</option>
              <option value="l">Liter</option>
              <option value="ml">Milliliter</option>
              <option value="gal">Gallon</option>
            </select>
          </div>
          
          <div class="form-group col-md-4">
            <label for="cost_price">Cost Price</label>
            <input 
              type="number" 
              id="cost_price" 
              name="cost_price" 
              [(ngModel)]="product.cost_price" 
              class="form-control" 
              step="0.01" 
              required>
          </div>
          
          <div class="form-group col-md-4">
            <label for="sell_price">Sell Price</label>
            <input 
              type="number" 
              id="sell_price" 
              name="sell_price" 
              [(ngModel)]="product.sell_price" 
              class="form-control" 
              step="0.01" 
              required>
          </div>
        </div>
        
        <div class="form-group form-check">
          <input 
            type="checkbox" 
            id="stock_tracking" 
            name="stock_tracking" 
            [(ngModel)]="product.stock_tracking" 
            class="form-check-input">
          <label for="stock_tracking" class="form-check-label">Track Stock</label>
        </div>
        
        <div class="form-group">
          <button 
            type="submit" 
            class="btn btn-primary"
            [disabled]="productForm.invalid || loading">
            Save Product
          </button>
          <button 
            type="button" 
            class="btn btn-secondary ml-2"
            (click)="cancel()">
            Cancel
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .form-group {
      margin-bottom: 1rem;
    }
    
    label {
      display: block;
      margin-bottom: 0.5rem;
    }
    
    .form-control {
      width: 100%;
      padding: 0.375rem 0.75rem;
      font-size: 1rem;
      line-height: 1.5;
      color: #495057;
      background-color: #fff;
      background-clip: padding-box;
      border: 1px solid #ced4da;
      border-radius: 0.25rem;
    }
    
    .form-row {
      display: flex;
      flex-wrap: wrap;
      margin-right: -5px;
      margin-left: -5px;
    }
    
    .col-md-4 {
      flex: 0 0 33.333333%;
      max-width: 33.333333%;
      padding-right: 5px;
      padding-left: 5px;
    }
    
    .form-check-input {
      margin-right: 0.5rem;
    }
    
    .btn {
      margin-right: 0.5rem;
    }
    
    .ml-2 {
      margin-left: 0.5rem;
    }
  `]
})
export class ProductFormComponent implements OnInit {
  product: Product = {
    id: 0,
    owner_id: 1, // This would come from the logged in user
    sku: '',
    name: '',
    description: '',
    uom: 'each',
    cost_price: 0,
    sell_price: 0,
    stock_tracking: true
  };
  
  isEditMode = false;
  loading = false;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.loadProduct(+id);
    }
  }

  loadProduct(id: number): void {
    this.productService.getProductById(id).subscribe({
      next: (response) => {
        if (response.success) {
          this.product = response.data;
        }
      },
      error: (error) => {
        console.error('Error loading product:', error);
      }
    });
  }

  saveProduct(): void {
    this.loading = true;
    
    if (this.isEditMode) {
      this.productService.updateProduct(this.product.id, this.product).subscribe({
        next: (response) => {
          if (response.success) {
            this.router.navigate(['/products']);
          }
          this.loading = false;
        },
        error: (error) => {
          console.error('Error updating product:', error);
          this.loading = false;
        }
      });
    } else {
      this.productService.createProduct(this.product).subscribe({
        next: (response) => {
          if (response.success) {
            this.router.navigate(['/products']);
          }
          this.loading = false;
        },
        error: (error) => {
          console.error('Error creating product:', error);
          this.loading = false;
        }
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/products']);
  }
}