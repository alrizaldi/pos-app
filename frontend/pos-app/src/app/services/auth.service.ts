import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../models/user.model';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  data: {
    user: User;
    token: string;
  };
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser = this.currentUserSubject.asObservable();

  private apiUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      console.log('User already logged in');
      this.currentUserSubject.next(JSON.parse(user));
    } else {
      console.log('No user found in localStorage');
    }
  }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    console.log('Attempting to login with credentials:', credentials);
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap(response => {
          console.log('Login response:', response);
          if (response.success) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            this.currentUserSubject.next(response.data.user);
            console.log('Login successful, user set');
          } else {
            console.log('Login failed:', response.message);
          }
        })
      );
  }

  logout(): void {
    console.log('Logging out user');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    console.log('Checking if user is authenticated, token present:', !!token);
    return !!token;
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }
}