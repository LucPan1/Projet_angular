import { Component, OnInit, inject } from '@angular/core';
import { employee } from '../models/employee.interface';
import { EmployeeService } from '../services/employee.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { employeeSearchType } from '../enums/employee-search-type.enums';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { combineLatest, map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatSelectModule, 
    MatFormFieldModule, MatInputModule, MatIconModule, MatCardModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css',
})
export class EmployeeListComponent {

  employes$!: Observable<employee[]>;

  // Implémentation de la fonctionnalité de barre de recherche
  searchCtrl!: FormControl;
  searchTypeCtrl!: FormControl;
  searchTypeCtrlOptions!: {
    value: employeeSearchType,
    label: string
  }[];
  
  constructor(private employeesService: EmployeeService, private formBuilder: FormBuilder) { }
    
  employeeService = inject(EmployeeService);
  router = inject(Router);
  employees: employee[] = [];

  ngOnInit() {
    this.employeeService
      .getEmployees()
      .subscribe((data) => (this.employees = data));

    this.initForm();
    
    this.initObservables();
  
  // Abonnez-vous au BehaviorSubject pour obtenir les employés
  this.employeeService.employes$.subscribe(data => {
    this.employees = data;
  });
  }
  

  private initForm() {
    this.searchCtrl = this.formBuilder.control('');
    this.searchTypeCtrl= this.formBuilder.control(employeeSearchType.LASTNAME);
    this.searchTypeCtrlOptions = [
      { value: employeeSearchType.LASTNAME, label: 'Nom'},
      { value: employeeSearchType.FIRSTNAME, label: 'Prénom'},
      { value: employeeSearchType.EMAIL, label: 'Email'},
    ];
  }
  
  private initObservables() {
    const search$ = this.searchCtrl.valueChanges.pipe(
      startWith(this.searchCtrl.value),
      map(value => value.toLowerCase())
    );
    const searchType$: Observable<employeeSearchType> = this.searchTypeCtrl.valueChanges.pipe(
        startWith(this.searchTypeCtrl.value)
    );
    this.employes$ = combineLatest([
      search$,
      searchType$,
      this.employeesService.employes$
      ]
  ).pipe(
      map(([search, searchType, employes]) => employes.filter(employe => employe[searchType]
          .toLowerCase()
          .includes(search as string))
      )
  );
}

  trackByValue(index: number, option: { value: employeeSearchType; label: string }) {
    return option.value;
  }

  goToCreate() {
    this.router.navigate(['/create']);
  }

  editEmployee(id: string) {
    this.router.navigate(['/edit', id]);
  }

  deleteEmployee(id: string) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(id).subscribe(() => {
        this.employees = this.employees.filter((emp) => emp.id !== id);
      });
    }
  }
}
