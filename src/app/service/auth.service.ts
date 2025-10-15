import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, BehaviorSubject } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private CONNECT_KEY = 'est_connecter';
  private ADMIN_KEY = 'est_admin';
  private TOKEN_KEY = 'token';
  private USERNAME_KEY = 'username';
  private API_URL = 'http://localhost:3000/users';

  // Subjects pour suivre l'état de connexion et rôle
  private connectedSubject = new BehaviorSubject<boolean>(this.isConnected());
  private adminSubject = new BehaviorSubject<boolean>(this.isAdmin());
  private usernameSubject = new BehaviorSubject<String | null>(this.getUsername());

  connected$ = this.connectedSubject.asObservable();
  admin$ = this.adminSubject.asObservable();
  username$ = this.usernameSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<boolean> {
    return this.http.get<User[]>(this.API_URL).pipe(
      map(users => {
        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
          localStorage.setItem(this.CONNECT_KEY, 'true');
          localStorage.setItem(this.ADMIN_KEY, user.role === 'admin' ? 'true' : 'false');
          localStorage.setItem(this.TOKEN_KEY, user.token);
          localStorage.setItem(this.USERNAME_KEY, user.username);

          // Notifie les composants
          this.usernameSubject.next(user.username);
          this.connectedSubject.next(true);
          this.adminSubject.next(user.role === 'admin');

          return true;
        }
        return false;
      })
    );
  }

  logout() {
    localStorage.removeItem(this.CONNECT_KEY);
    localStorage.removeItem(this.ADMIN_KEY);
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USERNAME_KEY);

    // Notifie les composants
    this.connectedSubject.next(false);
    this.adminSubject.next(false);
  }

  isConnected(): boolean {
    return localStorage.getItem(this.CONNECT_KEY) === 'true';
  }

  isAdmin(): boolean {
    return localStorage.getItem(this.ADMIN_KEY) === 'true';
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getUsername(): string | null {
    return localStorage.getItem(this.USERNAME_KEY);
  }
}
