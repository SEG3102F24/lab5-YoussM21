import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, Validators, ReactiveFormsModule } from "@angular/forms";
import { EmployeeDbService } from "../firestore/employee-db.service";
import { Router, RouterLink } from "@angular/router";
import { Employee } from "../model/employee";

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule]
})
export class EmployeeComponent {
  private builder: FormBuilder = inject(FormBuilder);
  private employeeService: EmployeeDbService = inject(EmployeeDbService);
  private router: Router = inject(Router);

  employeeForm = this.builder.group({
    name: ['', Validators.required],
    dateOfBirth: ['', Validators.required],
    city: ['', Validators.required],
    salary: [0, Validators.required],
    gender: ['', Validators.pattern('^[MFX]$')],
    email: ['', [Validators.required, Validators.email]]
  });

  get name(): AbstractControl { return this.employeeForm.get('name')!; }
  get dateOfBirth(): AbstractControl { return this.employeeForm.get('dateOfBirth')!; }
  get city(): AbstractControl { return this.employeeForm.get('city')!; }
  get salary(): AbstractControl { return this.employeeForm.get('salary')!; }
  get gender(): AbstractControl { return this.employeeForm.get('gender')!; }
  get email(): AbstractControl { return this.employeeForm.get('email')!; }

  onSubmit() {
    if (this.employeeForm.valid) {
      const employee = new Employee(
        this.name.value,
        new Date(this.dateOfBirth.value),
        this.city.value,
        this.salary.value,
        this.gender.value,
        this.email.value
      );
      
      this.employeeService.addEmployee(employee)
        .then(() => {
          this.router.navigate(['/employees']);
        })
        .catch(error => {
          console.error('Error adding employee:', error);
        });
    }
  }
}