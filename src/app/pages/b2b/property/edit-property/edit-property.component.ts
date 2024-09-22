import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators, AbstractControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { AppConstants } from 'src/app/constants/appConstants';
import { ImageDto } from 'src/app/models/image.model';
import { NotificationService } from 'src/app/services/notification.service';
import { PropertyService } from 'src/app/services/property.service';

@Component({
  selector: 'app-edit-property',
  templateUrl: './edit-property.component.html',
  styleUrls: ['./edit-property.component.scss']
})
export class EditPropertyComponent implements OnInit {
  url: any;
  bsValue = new Date();
  bsValue1 = new Date();
  selectedId: any;
  selectedType: any;
  showView: boolean;
  headerName: any;
  editPropertyForm: UntypedFormGroup;
  bsConfiguration: Partial<BsDatepickerConfig>;
  selectedFile: File | null = null;
  imageData: ImageDto;
  propertydata: any;
  constructor(private activateRouter: ActivatedRoute, private router: Router, private fb: UntypedFormBuilder,
    private propertyService: PropertyService, private _http: HttpClient, private notificationService: NotificationService) {
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

    this.bsConfiguration = {
      dateInputFormat: 'YYYY-MM-DD',
      containerClass: 'theme-red',
      isAnimated: true,
    };

    this.getProperty();
  }

  getProperty() {
    this.propertyService.getProperty(this.selectedId).subscribe((data: any) => {
      this.propertydata = data;

      this.editPropertyForm = this.fb.group({
        id: this.propertydata.id,
        propertyName: [this.propertydata.propertyName, Validators.required],
        companyName: [this.propertydata.companyName, Validators.required],
        reraNumber: [this.propertydata.reraNumber, Validators.required],

        guidelineValue: [this.propertydata.guidelineValue, Validators.required],

        propertyType: [this.propertydata.propertyType, Validators.required],
        totalPlots: [this.propertydata.totalPlots, Validators.required],

        poc: [this.propertydata.poc, Validators.required],
        mobile: [this.propertydata.mobile, Validators.required],

        amenities: [this.propertydata.amenities, Validators.required],
        startDate: [new Date(this.propertydata.startDate), Validators.required],

        extensionDate: [new Date(this.propertydata.extensionDate), Validators.required],
        propertyDescription: [this.propertydata.propertyDescription],
        status: [this.propertydata.status, Validators.required],
        propertyMap: [this.propertydata.propertyMap],

        address: this.fb.group({
          directions: [this.propertydata.address.directions, Validators.required],
          village: [this.propertydata.address.village, Validators.required],
          district: [this.propertydata.address.district, Validators.required],
          state: [this.propertydata.address.state, Validators.required],
        })

      });

      this.getImagePath(this.propertydata.propertyMap);
      this.editPropertyForm.markAllAsTouched();
      this.editPropertyForm.updateValueAndValidity();
    }, (error: any) => {

    })
  }

  updateProperty() {
    if (this.editPropertyForm.valid && this.headerName == "Update") {
      this.propertyService.updateProperty(this.editPropertyForm.value).subscribe((data: any) => {
        this.notificationService.showNotification("success", "Property Updated Successfully!");
        this.router.navigateByUrl("/admin/properties");
      }, (error: any) => {
        this.notificationService.showNotification("danger", "Property Not Updated");
      })
    } else if (this.headerName == "View") {
      this.router.navigateByUrl("/admin/properties");
    }

  }

  gotoBack() {
    this.router.navigateByUrl('/admin/properties');
  }

  get f(): { [key: string]: AbstractControl } {
    return this.editPropertyForm.controls;
  }

  get g(): { [key: string]: AbstractControl } {
    let c = this.editPropertyForm.controls.address as FormGroup
    return c.controls;
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
            this.editPropertyForm.patchValue({
              propertyMap: this.imageData?.imageName
            })
            this.updateProperty();
          },
          (error: HttpErrorResponse) => {
            console.dir(error);
            this.notificationService.showNotification("danger", "File Uplaod Failed");
          }
        );
    } else {
      this.updateProperty();
    }
  }


  getImagePath(image: string) {
    return AppConstants.GET_IMAGE_PATH(image);
  }

}