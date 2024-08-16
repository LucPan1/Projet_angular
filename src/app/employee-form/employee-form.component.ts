import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css',
})
export class EmployeeFormComponent {
  employeeForm: FormGroup;
  isEdit = false;
  employeeId: string | null = null;

  // Injection de dépendances
  fb = inject(FormBuilder);
  employeeService = inject(EmployeeService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  constructor() {
    this.employeeForm = this.fb.group({
      lastname: ['', Validators.required],
      firstname: ['', Validators.required],
      email: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.isEdit = true;
        this.employeeId = id;
        this.employeeService.getEmployee(this.employeeId).subscribe((data) => {
          this.employeeForm.patchValue(data);
        });
      }
    });
  }

  onSubmit() {
    if (this.employeeForm.invalid) return;

    if (this.isEdit && this.employeeId) {
      // Modifier un employé
      this.employeeService
        .updateEmployee(this.employeeId, this.employeeForm.value)
        .subscribe(() => {
          this.router.navigate(['/employeesList']);
        });
    } else {
      // Ajouter un employé
      this.employeeService
        .createEmployee(this.employeeForm.value)
        .subscribe(() => {
          this.router.navigate(['/employeesList']);
        });
    }
  }
}
