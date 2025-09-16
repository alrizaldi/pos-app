import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '../models/store.model';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private apiUrl = 'http://localhost:3000/api/stores';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getAllStores(): Observable<{ success: boolean, data: Store[] }> {
    return this.http.get<{ success: boolean, data: Store[] }>(this.apiUrl, { headers: this.getHeaders() });
  }

  getStoreById(id: number): Observable<{ success: boolean, data: Store }> {
    return this.http.get<{ success: boolean, data: Store }>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  getStoresByOwnerId(ownerId: number): Observable<{ success: boolean, data: Store[] }> {
    return this.http.get<{ success: boolean, data: Store[] }>(`${this.apiUrl}/owner/${ownerId}`, { headers: this.getHeaders() });
  }

  createStore(store: Omit<Store, 'id' | 'created_at'>): Observable<{ success: boolean, data: { id: number } }> {
    return this.http.post<{ success: boolean, data: { id: number } }>(this.apiUrl, store, { headers: this.getHeaders() });
  }

  updateStore(id: number, store: Partial<Store>): Observable<{ success: boolean, message: string }> {
    return this.http.put<{ success: boolean, message: string }>(`${this.apiUrl}/${id}`, store, { headers: this.getHeaders() });
  }

  deleteStore(id: number): Observable<{ success: boolean, message: string }> {
    return this.http.delete<{ success: boolean, message: string }>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}