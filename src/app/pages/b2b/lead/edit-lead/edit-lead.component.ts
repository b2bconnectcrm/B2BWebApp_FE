import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators, AbstractControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LeadService } from 'src/app/services/lead.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-edit-lead',
  templateUrl: './edit-lead.component.html',
  styleUrls: ['./edit-lead.component.scss']
})
export class EditLeadComponent implements OnInit {

  editLeadForm: UntypedFormGroup;
  selectedId: any;
  leadsList: any;
  selectedType: any;
  showView: boolean;
  headerName: any;
  

  constructor(private router: Router, private activateRouter: ActivatedRoute, private fb: UntypedFormBuilder,
     private leadService: LeadService, private notificationService: NotificationService) {
    this.selectedId = this.activateRouter.snapshot.paramMap.get('id');
    this.selectedType = this.activateRouter.snapshot.paramMap.get('type');
  }

  ngOnInit(): void {
    if (this.selectedType === 'edit') {
      this.headerName = 'Update';
      this.showView = false;
    } else {
      this.headerName = 'View';
      this.showView = true;
    }
    this.getLeadById();
  }

  updateLead() {
    console.log(this.editLeadForm.value)
    if (this.headerName == "Update" && this.editLeadForm.valid) {
      this.leadService.updateLead(this.editLeadForm.value).subscribe((data: any) => {
        this.notificationService.showNotification("success","Lead Updated Successfully!");
        this.router.navigateByUrl("/admin/leads");
      }, (error: any) => {
        this.notificationService.showNotification("danger","Lead Not Updated!");
      })
    } else if (this.headerName == "View") {
      this.router.navigateByUrl("/admin/leads");
    }
  }

  getLeadById() {
    this.leadService.getLeadId(this.selectedId).subscribe((data: any) => {
      this.leadsList = data;
      this.editLeadForm = this.fb.group({
        id: this.leadsList?.id,
        firstName: [this.leadsList?.firstName, Validators.required],
        middleName: [this.leadsList?.middleName],
        lastName: [this.leadsList?.lastName, Validators.required],

        occupation: [this.leadsList?.occupation, Validators.required],

        mobile: [this.leadsList?.mobile, Validators.required],
        email: [this.leadsList?.email, [Validators.required, Validators.email]],

        annualIncome: [this.leadsList?.annualIncome, Validators.required],
        industry: [this.leadsList?.industry, Validators.required],

        leadSource: [this.leadsList?.leadSource, Validators.required],
        leadStatus: [this.leadsList?.leadStatus, Validators.required],
        owner: [this.leadsList?.owner],

        address: this.fb.group({
          houseNo: [this.leadsList?.address?.houseNo, Validators.required],
          village: [this.leadsList?.address?.village, Validators.required],
          district: [this.leadsList?.address?.district, Validators.required],
          state: [this.leadsList?.address?.state, Validators.required],
          pincode: [this.leadsList?.address?.pincode, Validators.required],
        })

      });
      this.editLeadForm.markAllAsTouched();
      this.editLeadForm.updateValueAndValidity();
    }, (error: any) => {

    })
  }
  gotoBack() {
    this.router.navigateByUrl("/admin/leads");
  }

  get f(): { [key: string]: AbstractControl } {
    return this.editLeadForm.controls;
  }

  get g(): { [key: string]: AbstractControl } {
    let c = this.editLeadForm.controls.address as FormGroup
    return c.controls;
  }
}