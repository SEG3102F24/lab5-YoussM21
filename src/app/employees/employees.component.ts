import {Component, inject, OnInit} from '@angular/core';
import {EmployeeDbService} from "../firestore/employee-db.service";
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgFor, AsyncPipe, DatePipe, NgIf } from '@angular/common';
import { Employee } from '../model/employee';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
  standalone: true,
  imports: [RouterLink, NgFor, AsyncPipe, DatePipe, NgIf]
})
export class EmployeesComponent implements OnInit {
  protected employeeService: EmployeeDbService = inject(EmployeeDbService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  employees$!: Observable<Employee[]>;
  showList: boolean = false;

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employees$ = this.employeeService.getEmployees();
    this.showList = true;
  }

  showEmployeeList() {
    this.loadEmployees();
  }
}
