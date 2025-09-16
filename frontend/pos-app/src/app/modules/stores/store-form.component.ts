import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm, FormsModule } from '@angular/forms';
import { StoreService } from '../../services/store.service';
import { Store } from '../../models/store.model';

@Component({
  selector: 'app-store-form',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="container">
      <h2>{{ isEditMode ? 'Edit Store' : 'Add New Store' }}</h2>
      
      <form #storeForm="ngForm" (ngSubmit)="saveStore()">
        <div class="form-group">
          <label for="name">Store Name</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            [(ngModel)]="store.name" 
            class="form-control" 
            required>
        </div>
        
        <div class="form-group">
          <label for="address">Address</label>
          <textarea 
            id="address" 
            name="address" 
            [(ngModel)]="store.address" 
            class="form-control" 
            rows="3"></textarea>
        </div>
        
        <div class="form-group">
          <label for="phone">Phone</label>
          <input 
            type="text" 
            id="phone" 
            name="phone" 
            [(ngModel)]="store.phone" 
            class="form-control">
        </div>
        
        <div class="form-group">
          <label for="timezone">Timezone</label>
          <select 
            id="timezone" 
            name="timezone" 
            [(ngModel)]="store.timezone" 
            class="form-control">
            <option value="UTC">UTC</option>
            <option value="EST">EST</option>
            <option value="CST">CST</option>
            <option value="MST">MST</option>
            <option value="PST">PST</option>
          </select>
        </div>
        
        <div class="form-group">
          <label for="currency">Currency</label>
          <select 
            id="currency" 
            name="currency" 
            [(ngModel)]="store.currency" 
            class="form-control">
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
          </select>
        </div>
        
        <div class="form-group form-check">
          <input 
            type="checkbox" 
            id="is_active" 
            name="is_active" 
            [(ngModel)]="store.is_active" 
            class="form-check-input">
          <label for="is_active" class="form-check-label">Active</label>
        </div>
        
        <div class="form-group">
          <button 
            type="submit" 
            class="btn btn-primary"
            [disabled]="storeForm.invalid || loading">
            Save Store
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
export class StoreFormComponent implements OnInit {
  store: Store = {
    id: 0,
    owner_id: 1, // This would come from the logged in user
    name: '',
    address: '',
    phone: '',
    timezone: 'UTC',
    currency: 'USD',
    is_active: true
  };
  
  isEditMode = false;
  loading = false;

  constructor(
    private storeService: StoreService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.loadStore(+id);
    }
  }

  loadStore(id: number): void {
    this.storeService.getStoreById(id).subscribe({
      next: (response) => {
        if (response.success) {
          this.store = response.data;
        }
      },
      error: (error) => {
        console.error('Error loading store:', error);
      }
    });
  }

  saveStore(): void {
    this.loading = true;
    
    if (this.isEditMode) {
      this.storeService.updateStore(this.store.id, this.store).subscribe({
        next: (response) => {
          if (response.success) {
            this.router.navigate(['/stores']);
          }
          this.loading = false;
        },
        error: (error) => {
          console.error('Error updating store:', error);
          this.loading = false;
        }
      });
    } else {
      this.storeService.createStore(this.store).subscribe({
        next: (response) => {
          if (response.success) {
            this.router.navigate(['/stores']);
          }
          this.loading = false;
        },
        error: (error) => {
          console.error('Error creating store:', error);
          this.loading = false;
        }
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/stores']);
  }
}