import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { 
    path: 'login', 
    loadComponent: () => import('./modules/auth/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./modules/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'stores',
    loadChildren: () => import('./modules/stores/stores.module').then(m => m.StoresModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'products',
    loadChildren: () => import('./modules/products/products.module').then(m => m.ProductsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'purchasing',
    loadComponent: () => import('./modules/purchasing/purchasing.component').then(m => m.PurchasingComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'stock',
    loadComponent: () => import('./modules/stock/stock.component').then(m => m.StockComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'customers',
    loadComponent: () => import('./modules/customers/customers.component').then(m => m.CustomersComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'sales',
    loadComponent: () => import('./modules/sales/sales.component').then(m => m.SalesComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'reports',
    loadComponent: () => import('./modules/reports/reports.component').then(m => m.ReportsComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'settings',
    loadComponent: () => import('./modules/settings/settings.component').then(m => m.SettingsComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'test',
    loadComponent: () => import('./modules/test/test.component').then(m => m.TestComponent),
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '/dashboard' }
];