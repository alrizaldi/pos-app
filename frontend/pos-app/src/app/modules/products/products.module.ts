import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { ProductListComponent } from './product-list.component';
import { ProductFormComponent } from './product-form.component';

export const productRoutes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'new', component: ProductFormComponent },
  { path: ':id/edit', component: ProductFormComponent }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(productRoutes),
    ProductListComponent,
    ProductFormComponent
  ]
})
export class ProductsModule { }