import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { AppConstants } from 'src/app/constants/appConstants';
import { ImageDto } from 'src/app/models/image.model';
import { DealsService } from 'src/app/services/deals.service';
import { NotificationService } from 'src/app/services/notification.service';
import { PropertyService } from 'src/app/services/property.service';

@Component({
  selector: 'app-create-deals',
  templateUrl: './create-deals.component.html',
  styleUrls: ['./create-deals.component.scss']
})
export class CreateDealsComponent implements OnInit {


  url: any;
  bsValue = new Date();
  bsValue1 = new Date();
  createDealsForm: UntypedFormGroup;
  bsConfiguration: Partial<BsDatepickerConfig>;
  selectedPancardFile: File | null = null;
  imageData: ImageDto;
  pancardUrl: string | ArrayBuffer;
  pancardFileUploaded: boolean = false;

  stagedValues: any = [
    { value: 'STARTED', displayValue: 'Started' },
    { value: 'DOWNPAYMENT_STAGE', displayValue: 'Downpayment Stage' },
    { value: 'NEGOTIATION', displayValue: 'Negotiation' },
  ];
  salesPipelines: any = [
    { value: 'OPEN', displayValue: 'Open' },
    { value: 'COLD_CALLING_MEETING', displayValue: 'Cold Calling/Meeting' },
    { value: 'PROPOSAL', displayValue: 'Proposal' },
    { value: 'NEGOTIATION', displayValue: 'Negotiation' },
    { value: 'DEALS_OFFERED', displayValue: 'Deal Offered' },
    { value: 'CLOSURE', displayValue: 'Closure' },
    { value: 'CONVERSION', displayValue: 'Conversion' }
  ]
  UnitStatusValues: any = [
    { value: 'Blocked', displayValue: 'Blocked' },
    { value: 'Sold', displayValue: 'Sold' },
  ]
  projectTypeValues: any = [
    { value: 'FLAT', displayValue: 'FLAT' },
    { value: 'OPENPLOT', displayValue: 'OPEN PLOT' },
    { value: 'COMMERCIALSPACE', displayValue: 'COMMERCIAL SPACE' }
  ]
  constructor(private router: Router, private fb: UntypedFormBuilder, private propertyService: PropertyService,
    private _http: HttpClient, private dealsService: DealsService,
    private notificationService: NotificationService) {
    this.createDealsForm = this.fb.group({
      id: [''],
      dealName: ['', Validators.required],
      dealOwner: ['', Validators.required],
      clientName: ['', Validators.required],
      unitStatus: ['', Validators.required],
      accountName: ['', Validators.required],
      salesPipeline: ['', Validators.required],
      stage: ['', Validators.required],

      pancardFilePath: ['', Validators.required],
      pancardNumber: ['', Validators.required],
      amount: ['', Validators.required],

      forcastCategory: ['', Validators.required],
      commissionPercent: ['', Validators.required],
      closingDate: ['', Validators.required],
      phone: ['', Validators.required],
      projectType: ['', Validators.required],

      referredBy: ['', Validators.required],
      leadId: ['', Validators.required],
      employeeId: [''],
    });



    this.bsConfiguration = {
      dateInputFormat: 'YYYY-MM-DD',
      containerClass: 'theme-red',
      isAnimated: true,
    };
  }

  ngOnInit(): void {
    // this.getAllRoles();
  }

  createDeals() {
    console.dir(this.createDealsForm.value);
    if (this.createDealsForm.valid) {
      this.dealsService.createDeals(this.createDealsForm.value).subscribe((data: any) => {
        this.notificationService.showNotification("success", "Deals Created Successfully!");
        this.router.navigateByUrl("/admin/deals-list");
      }, (error: any) => {
        this.notificationService.showNotification("danger", "Deals Not Created");
      })
    } else {
      this.notificationService.showNotification("danger", "Please Enter All Required Fields");
    }
  }

  gotoBack() {
    this.router.navigateByUrl('/admin/deals-list');
  }

  get f(): { [key: string]: AbstractControl } {
    return this.createDealsForm.controls;
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result;
      }
    }
  }

  onPancardFileSelected(event: any): void {

    this.selectedPancardFile = event.target.files[0];
    if (this.selectedPancardFile) {
      console.dir(this.selectedPancardFile);
      var reader = new FileReader();

      reader.readAsDataURL(this.selectedPancardFile); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.pancardUrl = event.target.result;
      }
    }

  }

  uploadPancardImage() {
    if (this.selectedPancardFile) {
      const formData = new FormData();
      formData.append('file', this.selectedPancardFile);
      this._http.post(AppConstants.uploadUrl, formData, { responseType: 'json' })
        .subscribe(
          (response: ImageDto) => {
            this.notificationService.showNotification("success", "File Uploaded Successfully!");
            this.pancardFileUploaded = true;
            this.imageData = response;
            console.dir(this.imageData);
            console.dir(this.imageData.path);
            console.dir(this.imageData?.path);
            console.dir(response?.imageName);
            this.createDealsForm.patchValue({
              pancardFilePath: this.imageData.path
            })
            console.dir(this.createDealsForm.value)
          },
          (error: HttpErrorResponse) => {
            this.notificationService.showNotification("danger", "File Upload Failed");
            console.dir(error);
          }
        );
    } else {
      this.notificationService.showNotification("danger", "Please Upload File");
    }
  }
}