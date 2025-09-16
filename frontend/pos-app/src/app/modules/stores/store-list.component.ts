import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';
import { StoreService } from '../../services/store.service';
import { Store } from '../../models/store.model';

@Component({
  selector: 'app-store-list',
  standalone: true,
  imports: [NgFor],
  template: `
    <div class="container">
      <div class="header">
        <h2>Stores</h2>
        <button class="btn btn-primary" (click)="createStore()">Add New Store</button>
      </div>
      
      <div class="table-responsive">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let store of stores">
              <td>{{ store.name }}</td>
              <td>{{ store.address }}</td>
              <td>{{ store.phone }}</td>
              <td>
                <span class="badge" [class.badge-success]="store.is_active" [class.badge-secondary]="!store.is_active">
                  {{ store.is_active ? 'Active' : 'Inactive' }}
                </span>
              </td>
              <td>
                <button class="btn btn-sm btn-primary" (click)="editStore(store.id)">Edit</button>
                <button class="btn btn-sm btn-danger" (click)="deleteStore(store.id)">Delete</button>
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
export class StoreListComponent implements OnInit {
  stores: Store[] = [];

  constructor(
    private storeService: StoreService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadStores();
  }

  loadStores(): void {
    this.storeService.getAllStores().subscribe({
      next: (response) => {
        if (response.success) {
          this.stores = response.data;
        }
      },
      error: (error) => {
        console.error('Error loading stores:', error);
      }
    });
  }

  createStore(): void {
    this.router.navigate(['/stores/new']);
  }

  editStore(id: number): void {
    this.router.navigate(['/stores', id, 'edit']);
  }

  deleteStore(id: number): void {
    if (confirm('Are you sure you want to delete this store?')) {
      this.storeService.deleteStore(id).subscribe({
        next: (response) => {
          if (response.success) {
            // Remove the store from the list
            this.stores = this.stores.filter(store => store.id !== id);
          }
        },
        error: (error) => {
          console.error('Error deleting store:', error);
        }
      });
    }
  }
}