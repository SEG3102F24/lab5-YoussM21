import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, Timestamp } from '@angular/fire/firestore';
import { Employee } from '../model/employee';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDbService {
  private firestore: Firestore = inject(Firestore);

  addEmployee(employee: Employee) {
    const employeesCollection = collection(this.firestore, 'employees');
    return addDoc(employeesCollection, {
      name: employee.name,
      dateOfBirth: employee.dateOfBirth,
      city: employee.city,
      salary: employee.salary,
      gender: employee.gender,
      email: employee.email
    })
  }

  getEmployees(): Observable<Employee[]> {
    const employeesCollection = collection(this.firestore, 'employees');
    return collectionData(employeesCollection, { idField: 'id' }).pipe(
      map(employees => employees.map(emp => ({
        ...emp,
        dateOfBirth: emp['dateOfBirth'] instanceof Timestamp 
          ? (emp['dateOfBirth'] as Timestamp).toDate() 
          : emp['dateOfBirth']
      })))
    ) as Observable<Employee[]>;
  }

}