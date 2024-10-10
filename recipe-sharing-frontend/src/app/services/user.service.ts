import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'api/users';  // In-memory baza podataka

  constructor(private http: HttpClient) {}

  // Metoda za registraciju korisnika
  register(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  // Metoda za dohvaćanje svih korisnika (ako je potrebno)
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }
}
