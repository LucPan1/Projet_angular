import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, of, switchMap } from 'rxjs';
import { employee } from '../models/employee.interface';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiUrl = 'http://localhost:3000/employees'; 
  http = inject(HttpClient);

  private _employes$ = new BehaviorSubject<employee[]>([]);

  get employes$(): Observable<employee[]> {
    return this._employes$.asObservable();
  }

  // Méthode pour récupérer les employés depuis l'API
  getEmployes(): void {
    this.http.get<employee[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Error fetching employees', error);
        return of([]); // En cas d'erreur, retourne un tableau vide
      })
    ).subscribe(employes => {
      this._employes$.next(employes); // Mise à jour du BehaviorSubject
    });
  }
  

  getEmployees(): Observable<employee[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getEmployee(id: string): Observable<employee> {
    return this.http.get<employee>(`${this.apiUrl}/${id}`);
  }

  createEmployee(employee: employee): Observable<employee> {
    return this.getEmployees().pipe(
      map((employees) => {
        const maxId = employees.reduce((max, emp) => Math.max(max, +emp.id), 0);
        employee.id = (maxId + 1).toString();
        return employee;
      }),
      switchMap((newEmployee) =>
        this.http.post<employee>(this.apiUrl, newEmployee)
      )
    );
  }

  updateEmployee(id: string, employee: employee): Observable<employee> {
    return this.http.put<employee>(`${this.apiUrl}/${id}`, employee);
  }

  deleteEmployee(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
