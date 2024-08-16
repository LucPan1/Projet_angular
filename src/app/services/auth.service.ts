import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/employees'; // URL de l'API d'authentification
  private currentUserSubject: BehaviorSubject<any>; 
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  // Récupère l'utilisateur actuel
  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  // Connexion de l'utilisateur
  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password }).pipe(
      map(user => {
        // Stocke les détails de l'utilisateur et le token dans le local storage pour maintenir la session
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }),
      catchError(error => {
        console.error('Error during login', error);
        return of(null);
      })
    );
  }

  // Inscription de l'utilisateur
  register(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, { username, password }).pipe(
      catchError(error => {
        console.error('Error during registration', error);
        return of(null);
      })
    );
  }

  // Déconnexion de l'utilisateur
  logout(): void {
    // Supprime l'utilisateur du local storage
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
