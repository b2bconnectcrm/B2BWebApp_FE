import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from 'src/app/models/role.model';
import { RoleService } from 'src/app/services/role.service';
import swal from "sweetalert2";
@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss']
})
export class RoleListComponent implements OnInit {

  roles: Array<Role> = [];
  constructor(private router: Router, private roleService: RoleService) { }

  
  ngOnInit() {
    this.getAllRoles();
  }

  gotoNewRoleCreation() {
    this.router.navigateByUrl("/admin/add_role");
  }

  getAllRoles() {
    this.roleService.getAllRoles().subscribe((data: any) => {
      this.roles = data;
      console.dir(data);
      console.dir(this.roles)
    }, (error: any) => {

    })
  }
  edit(data){  
    this.router.navigate(["/admin/edit_role",data.id]);
  } 

  deleteRole(id: number){
    this.roleService.deleteRole(id).subscribe((data: any) => {
      this.getAllRoles();
    }, (error: any) => {

    })
  }

  questionSwal(roleId: number) {
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
        this.deleteRole(roleId);  
      }
    });
  }
}
