import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators, AbstractControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { AppConstants } from 'src/app/constants/appConstants';
import { ImageDto } from 'src/app/models/image.model';
import { NotificationService } from 'src/app/services/notification.service';
import { PropertyService } from 'src/app/services/property.service';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.scss']
})
export class AddPropertyComponent implements OnInit {
  url: any;
  bsValue = new Date();
  bsValue1 = new Date();
  createPropertyForm: UntypedFormGroup;
  bsConfiguration: Partial<BsDatepickerConfig>;
  selectedFile: File | null = null;
  imageData: ImageDto;
  constructor(private router: Router, private fb: UntypedFormBuilder, private propertyService: PropertyService,
    private _http: HttpClient, private notificationService: NotificationService) {
    this.createPropertyForm = this.fb.group({
      propertyName: ['', Validators.required],
      companyName: ['', Validators.required],
      reraNumber: ['', Validators.required],

      guidelineValue: ['', Validators.required],

      propertyType: ['', Validators.required],
      totalPlots: ['', Validators.required],

      poc: ['', Validators.required],
      mobile: ['', Validators.required],

      amenities: ['', Validators.required],
      startDate: ['', Validators.required],

      extensionDate: ['', Validators.required],
      propertyDescription: [''],
      status: ['', Validators.required],
      propertyMap: [''],

      address: this.fb.group({
        directions: ['', Validators.required],
        village: ['', Validators.required],
        district: ['', Validators.required],
        state: ['', Validators.required],
      })

    });
    this.bsConfiguration = {
      dateInputFormat: 'YYYY-MM-DD',
      containerClass: 'theme-red',
      isAnimated: true,
    };
  }

  ngOnInit(): void {
  }

  createProperty() {
    console.dir(this.createPropertyForm.value);
    if (this.createPropertyForm.valid) {
      this.propertyService.createProperty(this.createPropertyForm.value).subscribe((data: any) => {
        this.notificationService.showNotification("success", "Property Created Successfully!");
        this.router.navigateByUrl("/admin/properties");
      }, (error: any) => {
        this.notificationService.showNotification("danger", "Property Not Created");
      })
    } else {
      this.notificationService.showNotification("danger", "Please Enter all Required Field");
    }
  }

  gotoBack() {
    this.router.navigateByUrl('/admin/properties');
  }

  get f(): { [key: string]: AbstractControl } {
    return this.createPropertyForm.controls;
  }

  get g(): { [key: string]: AbstractControl } {
    let c = this.createPropertyForm.controls.address as FormGroup
    return c.controls;
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

  onFileSelected(event: any): void {

    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      console.dir(this.selectedFile);
      var reader = new FileReader();

      reader.readAsDataURL(this.selectedFile); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result;
      }
    }

  }

  uploadImage() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      this._http.post(AppConstants.uploadUrl, formData, { responseType: 'json' })
        .subscribe(
          (response: ImageDto) => {
            this.notificationService.showNotification("success", "File Uploaded Successfully!");
            this.imageData = response;
            console.dir(this.imageData);
            console.dir(this.imageData.imageName);
            console.dir(this.imageData?.imageName);
            console.dir(response?.imageName);
            this.createPropertyForm.patchValue({
              propertyMap: this.imageData.imageName
            })

            console.dir(this.createPropertyForm.get('propertyMap').value)
            console.dir(this.createPropertyForm.value)
            this.createProperty();
          },
          (error: HttpErrorResponse) => {
            console.dir(error);
            this.notificationService.showNotification("danger", "File Uplaod Failed");
          }
        );
    } else {
      this.notificationService.showNotification("danger", "Please Uplaod file");
    }
  }
}