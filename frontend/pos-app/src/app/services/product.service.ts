import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/api/products';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getAllProducts(): Observable<{ success: boolean, data: Product[] }> {
    return this.http.get<{ success: boolean, data: Product[] }>(this.apiUrl, { headers: this.getHeaders() });
  }

  getProductById(id: number): Observable<{ success: boolean, data: Product }> {
    return this.http.get<{ success: boolean, data: Product }>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  getProductsByStoreId(storeId: number): Observable<{ success: boolean, data: Product[] }> {
    return this.http.get<{ success: boolean, data: Product[] }>(`${this.apiUrl}/store/${storeId}`, { headers: this.getHeaders() });
  }

  createProduct(product: Omit<Product, 'id' | 'created_at'>): Observable<{ success: boolean, data: { id: number } }> {
    return this.http.post<{ success: boolean, data: { id: number } }>(this.apiUrl, product, { headers: this.getHeaders() });
  }

  updateProduct(id: number, product: Partial<Product>): Observable<{ success: boolean, message: string }> {
    return this.http.put<{ success: boolean, message: string }>(`${this.apiUrl}/${id}`, product, { headers: this.getHeaders() });
  }

  deleteProduct(id: number): Observable<{ success: boolean, message: string }> {
    return this.http.delete<{ success: boolean, message: string }>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}