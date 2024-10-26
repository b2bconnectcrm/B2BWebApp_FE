import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Deals } from 'src/app/models/deals.model';
import { Employee } from 'src/app/models/employee.model';
import { DealsService } from 'src/app/services/deals.service';
import { EmployeeService } from 'src/app/services/employee.service';
import swal from "sweetalert2";

@Component({
  selector: 'app-deals-list',
  templateUrl: './deals-list.component.html',
  styleUrls: ['./deals-list.component.scss']
})
export class DealsListComponent implements OnInit {
  deals: Array<Deals> = [];
 
  constructor(private router: Router, private dealsService: DealsService) { }

  
  ngOnInit() {
    this.getAllDeals();
  }

  gotoNewDealsCreation() {
    this.router.navigateByUrl("/admin/create-deals");
  }

  getAllDeals() {
    this.dealsService.getAllDealss().subscribe((data: any) => {
      this.deals = data;
      console.dir(data);
      console.dir(this.deals)
    }, (error: any) => {

    })
  }

  edit(data){  
    this.router.navigate(["/admin/update-deals",data.id,'edit']);
  } 

  view(data){  
    console.log(data)
    this.router.navigate(["/admin/update-deals",data.id,'view']);
  }
  

  deleteDeals(id: number){
    this.dealsService.deleteDeals(id).subscribe((data: any) => {
      this.getAllDeals();
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
        this.deleteDeals(employeeId);  
      }
    });
  }
}
