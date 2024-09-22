import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Property } from 'src/app/models/property.model';
import { PropertyService } from 'src/app/services/property.service';
import swal from "sweetalert2";
@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.scss']
})
export class PropertyListComponent implements OnInit {

  properties: Array<Property> = [];
  constructor(private router: Router, private propertyService: PropertyService) { }

  
  ngOnInit() {
    this.getAllProperties();
  }

  gotoNewLPropertyCreation() {
    this.router.navigateByUrl("/admin/add_property");
  }

  getAllProperties() {
    this.propertyService.getAllProperties().subscribe((data: any) => {
      this.properties = data;
      console.dir(data);
      console.dir(this.properties)
    }, (error: any) => {

    })
  }
  edit(data){  
    this.router.navigate(["/admin/edit_property",data.id,'edit']);
  } 
  view(data){  
    console.log(data)
    this.router.navigate(["/admin/edit_property",data.id,'view']);
  }

  deleteProperty(id: number){
    this.propertyService.deleteProperty(id).subscribe((data: any) => {
      this.getAllProperties();
    }, (error: any) => {

    })
  }

  questionSwal(propertyId: number) {
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
        this.deleteProperty(propertyId);  
      }
    });
  }
}
