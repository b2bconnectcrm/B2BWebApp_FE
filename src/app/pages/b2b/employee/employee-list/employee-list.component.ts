import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/models/employee.model';
import { Property } from 'src/app/models/property.model';
import { EmployeeService } from 'src/app/services/employee.service';
import swal from "sweetalert2";
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  employees: Array<Employee> = [];
 
  constructor(private router: Router, private employeeService: EmployeeService) { }

  
  ngOnInit() {
    this.getAllEmployees();
  }

  gotoNewLemployeeCreation() {
    this.router.navigateByUrl("/admin/add_employee");
  }

  getAllEmployees() {
    this.employeeService.getAllEmployees().subscribe((data: any) => {
      this.employees = data;
      console.dir(data);
      console.dir(this.employees)
    }, (error: any) => {

    })
  }
  edit(data){  
    this.router.navigate(["/admin/edit_employee",data.id,'edit']);
  } 
  view(data){  
    console.log(data)
    this.router.navigate(["/admin/edit_employee",data.id,'view']);
  }

  deleteEmployee(id: number){
    this.employeeService.deleteEmployee(id).subscribe((data: any) => {
      this.getAllEmployees();
    }, (error: any) => {

    })
  }

  questionSwal(employeeId: number) {
    swal.fire({
      title: "Are you sure?",
      text: "Do you want to Delete",
      icon: "question",
      buttonsStyling: false,
      customClass: {
        confirmButton: "btn btn-default",
        closeButton: "btn-close",
        cancelButton:"btn btn-danger",
      },
      showCancelButton: true,
      showCloseButton: true,
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteEmployee(employeeId);  
      }
    });
  }
}
