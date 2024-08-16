import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { Router } from '@angular/router';
import { employee } from '../models/employee.interface';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-profile-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {
  profileForm!: FormGroup;
  employeeService = inject(EmployeeService);
  router = inject(Router);

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();

    // Récupérer les informations de l'utilisateur actuel depuis le service
    this.employeeService.getEmployee('currentUserId').subscribe((employee: employee) => {
      this.profileForm.patchValue(employee);
    });
  }

  private initForm(): void {
    this.profileForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      age: ['', [Validators.required, Validators.min(18)]],
    });
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      this.employeeService.updateEmployee('currentUserId', this.profileForm.value).subscribe(() => {
        // Redirection après mise à jour réussie
        this.router.navigate(['/profile']);
      });
    } else {
      console.log('Formulaire invalide');
    }
  }
}
