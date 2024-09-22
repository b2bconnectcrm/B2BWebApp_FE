import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators, AbstractControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.scss']
})
export class AddRoleComponent implements OnInit {
  createRoleForm: UntypedFormGroup;
  constructor(private router: Router, private fb: UntypedFormBuilder, private roleService: RoleService,
    private notificationService: NotificationService) {
    this.createRoleForm = this.fb.group({
      id:[''],
      department: ['', Validators.required],
      roleName: ['', Validators.required],
      roleDisplayName: ['', Validators.required],
      description: [''],
    });
   
  }

  ngOnInit(): void {
  }

  createRole() {
    console.dir(this.createRoleForm.value);
    if (this.createRoleForm.valid) {
      this.roleService.createRole(this.createRoleForm.value).subscribe((data: any) => {
        this.notificationService.showNotification("success","Role Created Successfully!");
        this.router.navigateByUrl("/admin/roleList");
      }, (error: any) => {
        this.notificationService.showNotification("danger","Role Not Created!");
      })
    } else{
      this.notificationService.showNotification("danger","Please Enter All Required Field");
    }
  }

  gotoBack() {
    this.router.navigateByUrl('/admin/roleList');
  }

  get f(): { [key: string]: AbstractControl } {
    return this.createRoleForm.controls;
  }

}