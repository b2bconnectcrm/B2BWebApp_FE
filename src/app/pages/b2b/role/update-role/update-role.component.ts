import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from 'src/app/models/role.model';
import { NotificationService } from 'src/app/services/notification.service';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-update-role',
  templateUrl: './update-role.component.html',
  styleUrls: ['./update-role.component.scss']
})
export class UpdateRoleComponent implements OnInit {

  updateRoleForm: UntypedFormGroup;
  selectedId: string;
  role: Role;
  constructor(private router: Router, private activateRouter: ActivatedRoute, private fb: UntypedFormBuilder,
     private roleService: RoleService,  private notificationService: NotificationService) {
    this.selectedId = this.activateRouter.snapshot.paramMap.get('id');


  }

  ngOnInit(): void {
    this.getRole();
  }

  getRole() {
    this.roleService.getRole(this.selectedId).subscribe((data: any) => {
      this.role = data;
      this.updateRoleForm = this.fb.group({
        id: [ this.role.id],
        department:[ this.role.department, Validators.required],
        roleName: [ this.role.roleName, Validators.required],
        roleDisplayName: [ this.role.roleDisplayName, Validators.required],
        description: [ this.role.description],
      });
    }, (error: any) => {

    })
  }
  updateRole() {
    console.dir(this.updateRoleForm.value);
    if (this.updateRoleForm.valid) {
      this.roleService.updateRole(this.updateRoleForm.value).subscribe((data: any) => {
        this.notificationService.showNotification("success","Role Updated Successfully!");
        this.router.navigateByUrl("/admin/roleList");
      }, (error: any) => {
        this.notificationService.showNotification("danger","Role Not Updated");
      })
    }else{
      this.notificationService.showNotification("danger","Please Enter all Required Field");
    }
  }

  gotoBack() {
    this.router.navigateByUrl('/admin/roleList');
  }

  get f(): { [key: string]: AbstractControl } {
    return this.updateRoleForm.controls;
  }


}