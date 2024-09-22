import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Lead } from 'src/app/models/lead.model';
import { LeadService } from 'src/app/services/lead.service';
import swal from "sweetalert2";
@Component({
  selector: 'app-lead-list',
  templateUrl: './lead-list.component.html',
  styleUrls: ['./lead-list.component.scss']
})
export class LeadListComponent implements OnInit {
  theamType: any = 'W';
  leadsList: Array<Lead> = [];
  constructor(private router: Router, private leadService: LeadService) { }
  leadsList1 = [
    {
      id: 1, firstName: 'adas', lastName: 'sdsdf', industry: 'sdf', address: {
        state: 'AP'
      }, mobile: '9283476926348', email: 'sdf@getMaxListeners.com',
      leadStatus: 'Y', createdDate: new Date(), owner: 'Satish'
    },
    {
      id: 3, firstName: 'adas', lastName: 'sdsdf', industry: 'sdf', address: {
        state: 'AP'
      }, mobile: '9283476926348', email: 'sdf@getMaxListeners.com',
      leadStatus: 'Y', createdDate: new Date(), owner: 'Satish'
    },
    {
      id: 2, firstName: 'adas', lastName: 'sdsdf', industry: 'sdf', address: {
        state: 'AP'
      }, mobile: '9283476926348', email: 'sdf@getMaxListeners.com',
      leadStatus: 'Y', createdDate: new Date(), owner: 'Satish'
    },
  ]
  ngOnInit(): void {
    this.getAllLeads();
  }

  gotoNewLoadCreation() {
    this.router.navigateByUrl("/admin/add_lead");
  }

  getAllLeads() {
    this.leadService.getAllLeads().subscribe((data: any) => {
      this.leadsList = data;
      console.dir(data);
      console.dir(this.leadsList)
    }, (error: any) => {

    })
  }
  
  edit(data) {
    console.log(data)
    this.router.navigate(["/admin/edit_lead/", data.id, 'edit']);
  }

  view(data) {
    console.log(data)
    this.router.navigate(["/admin/edit_lead/", data.id, 'view']);
  }

  deleteLead(id: number){
    this.leadService.deleteLead(id).subscribe((data: any) => {
      this.getAllLeads();
    }, (error: any) => {

    })
  }

  questionSwal(leadId: number) {
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
        this.deleteLead(leadId);  
      }
    });
  }
}
