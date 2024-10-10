import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface User {
  email: string;
  password: string;
  username?: string; // Samo za registraciju
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth'; // URL backend-a

  constructor(private http: HttpClient) { }

  register(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, user);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }
}
