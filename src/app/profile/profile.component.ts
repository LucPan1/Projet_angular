import { Component, OnInit, inject } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { employee } from '../models/employee.interface';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  constructor(private employeesService: EmployeeService, private formBuilder: FormBuilder) { }
    
  employeeService = inject(EmployeeService);
  router = inject(Router);
  employees: employee[] = [];

  ngOnInit() {
    this.employeeService
      .getEmployees()
      .subscribe((data) => (this.employees = data));

    // this.initForm();
  }
}
