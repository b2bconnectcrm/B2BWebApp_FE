import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators, AbstractControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LeadService } from 'src/app/services/lead.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-add-lead',
  templateUrl: './add-lead.component.html',
  styleUrls: ['./add-lead.component.scss']
})
export class AddLeadComponent implements OnInit {

  createLeadForm: UntypedFormGroup;
  constructor(private router: Router, private fb: UntypedFormBuilder, private leadService: LeadService,
    private notificationService: NotificationService) {
    this.createLeadForm = this.fb.group({
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],

      occupation: ['', Validators.required],

      mobile: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],

      annualIncome: ['', Validators.required],
      industry: ['', Validators.required],

      leadSource: ['', Validators.required],
      leadStatus: ['', Validators.required],
      owner: [''],

      address: this.fb.group({
        houseNo: ['', Validators.required],
        village: ['', Validators.required],
        district: ['', Validators.required],
        state: ['', Validators.required],
        pincode: ['', Validators.required],
      })

    })
    console.log(this.createLeadForm)
  }

  ngOnInit(): void {
  }

  createLead() {
    if (this.createLeadForm.valid) {
      this.leadService.createLead(this.createLeadForm.value).subscribe((data: any) => {
        this.notificationService.showNotification("success","Lead Created Successfully!");
        this.router.navigateByUrl("/admin/leads");
      }, (error: any) => {
        this.notificationService.showNotification("danger","Lead Not Created!");
      })
    }else{
      this.notificationService.showNotification("danger","Please Enter All Required Field");
    }

  }

  gotoBack() {
    this.router.navigateByUrl("/admin/leads");
  }

  get f(): { [key: string]: AbstractControl } {
    return this.createLeadForm.controls;
  }
  get g(): { [key: string]: AbstractControl } {
    let c = this.createLeadForm.controls.address as FormGroup
    return c.controls;
  }

}
