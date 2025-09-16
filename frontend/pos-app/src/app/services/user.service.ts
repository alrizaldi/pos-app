import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getAllUsers(): Observable<{ success: boolean, data: User[] }> {
    return this.http.get<{ success: boolean, data: User[] }>(this.apiUrl, { headers: this.getHeaders() });
  }

  getUserById(id: number): Observable<{ success: boolean, data: User }> {
    return this.http.get<{ success: boolean, data: User }>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  createUser(user: Omit<User, 'id' | 'created_at'>): Observable<{ success: boolean, data: { id: number } }> {
    return this.http.post<{ success: boolean, data: { id: number } }>(this.apiUrl, user, { headers: this.getHeaders() });
  }

  updateUser(id: number, user: Partial<User>): Observable<{ success: boolean, message: string }> {
    return this.http.put<{ success: boolean, message: string }>(`${this.apiUrl}/${id}`, user, { headers: this.getHeaders() });
  }

  deleteUser(id: number): Observable<{ success: boolean, message: string }> {
    return this.http.delete<{ success: boolean, message: string }>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}