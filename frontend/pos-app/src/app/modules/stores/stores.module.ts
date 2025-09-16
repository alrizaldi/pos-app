import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { StoreListComponent } from './store-list.component';
import { StoreFormComponent } from './store-form.component';

export const storeRoutes: Routes = [
  { path: '', component: StoreListComponent },
  { path: 'new', component: StoreFormComponent },
  { path: ':id/edit', component: StoreFormComponent }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(storeRoutes),
    StoreListComponent,
    StoreFormComponent
  ]
})
export class StoresModule { }