import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { ProfileComponent } from './profile/profile.component';

export const routes: Routes = [
    {
        path: "login",
        component: LoginComponent,
       
    },  
    {
        path: "home",
        component: HomeComponent
       
    },
    {
        path: "register",
        component: RegisterComponent
       
    }, 
    { 
        path: 'employeesList', 
        component: EmployeeListComponent 
    },
    { 
        path: 'create', 
        component: EmployeeFormComponent 
    },
    { 
        path: 'edit/:id', 
        component: EmployeeFormComponent 
    },
    { 
        path: 'profile', 
        component: ProfileComponent,
    },
    {   
        path: 'profile/edit',
        component: ProfileEditComponent 
    }
];
