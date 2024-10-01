import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { AppConstants } from 'src/app/constants/appConstants';
import { ImageDto } from 'src/app/models/image.model';
import { Role } from 'src/app/models/role.model';
import { EmployeeService } from 'src/app/services/employee.service';
import { NotificationService } from 'src/app/services/notification.service';
import { PropertyService } from 'src/app/services/property.service';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-create-deals',
  templateUrl: './create-deals.component.html',
  styleUrls: ['./create-deals.component.scss']
})
export class CreateDealsComponent implements OnInit {

 
  url: any;
  bsValue = new Date();
  bsValue1 = new Date();
  createEmployeeForm: UntypedFormGroup;
  bsConfiguration: Partial<BsDatepickerConfig>;
  selectedAadharFile: File | null = null;
  selectedPancardFile: File | null = null;
  imageData: ImageDto;
  aadharUrl: string | ArrayBuffer;
  pancardUrl: string | ArrayBuffer;
  roles: Array<Role> = [];
  selectedRoleId: number;
  aadharFileUploaded: boolean = false;
  pancardFileUploaded: boolean = false;
  constructor(private router: Router, private fb: UntypedFormBuilder, private propertyService: PropertyService,
    private _http: HttpClient, private roleService: RoleService, private employeeService: EmployeeService,
    private notificationService: NotificationService) {
    this.createEmployeeForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      email: ['', Validators.required],
      mobile: ['', Validators.required],
      aadharNumber: ['', Validators.required],
      pancardNumber: ['', Validators.required],
      username: ['', Validators.required],
      department: ['', Validators.required],
      aadharFilePath: ['', Validators.required],
      pancardFilePath: ['', Validators.required],
      role: [''],
      roleId: [''],
      address: this.fb.group({
        houseNo: ['', Validators.required],
        village: ['', Validators.required],
        district: ['', Validators.required],
        state: ['', Validators.required],
        pincode: ['', Validators.required],
      })

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

  getAllRoles() {
    this.roleService.getAllRoles().subscribe((data: any) => {
      this.roles = data;
    }, (error: any) => {

    })
  }

  getAllRolesByDepartment() {
    this.roleService.getAllRolesByDepartment(this.createEmployeeForm.get('department').value).subscribe((data: any) => {
      this.roles = data;
      console.dir(this.roles);
    }, (error: any) => {

    })
  }

  onRoleChange(event: any) {
    console.dir(event);
    console.dir(event.target.value);
    this.selectedRoleId = event.target.value;
    console.dir(this.selectedRoleId);
    console.dir(this.roles);
    const role = this.roles.find(role => role.id == this.selectedRoleId);

    console.dir(role)

    this.createEmployeeForm.patchValue({
      role: role,
      roleId: this.selectedRoleId
    })
  }

  createEmployee() {
    console.dir(this.createEmployeeForm.value);
    if (this.createEmployeeForm.valid) {
      this.employeeService.createEmployee(this.createEmployeeForm.value).subscribe((data: any) => {
        this.notificationService.showNotification("success", "Employee Created Successfully!");
        this.router.navigateByUrl("/admin/employeeList");
      }, (error: any) => {
        this.notificationService.showNotification("danger", "Employee Not Created");
      })
    } else {
      this.notificationService.showNotification("danger", "Please Enter All Required Fields");
    }
  }

  gotoBack() {
    this.router.navigateByUrl('/admin/employeeList');
  }

  get f(): { [key: string]: AbstractControl } {
    return this.createEmployeeForm.controls;
  }

  get g(): { [key: string]: AbstractControl } {
    let c = this.createEmployeeForm.controls.address as FormGroup
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

  onAadharFileSelected(event: any): void {

    this.selectedAadharFile = event.target.files[0];
    if (this.selectedAadharFile) {
      console.dir(this.selectedAadharFile);
      var reader = new FileReader();

      reader.readAsDataURL(this.selectedAadharFile); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.aadharUrl = event.target.result;
      }
    }

  }

  uploadImage() {
    if (this.selectedPancardFile && this.selectedAadharFile) {
      const formData = new FormData();
      formData.append('file', this.selectedAadharFile);
      formData.append('file', this.selectedPancardFile);
      this._http.post(AppConstants.uploadUrl, formData, { responseType: 'json' })
        .subscribe(
          (response: ImageDto) => {
            this.notificationService.showNotification("success", "File Uploaded Successfully!");
            this.imageData = response;
            console.dir(this.imageData);
            console.dir(this.imageData.imageName);
            console.dir(this.imageData?.imageName);
            console.dir(response?.imageName);
            this.createEmployeeForm.patchValue({
              propertyMap: this.imageData.imageName
            })

            console.dir(this.createEmployeeForm.get('propertyMap').value)
            console.dir(this.createEmployeeForm.value)
          },
          (error: HttpErrorResponse) => {
            this.notificationService.showNotification("danger", "File Upload Failed");
            console.dir(error);

          }
        );
    }
  }

  uploadAadharImage() {
    if (this.selectedAadharFile) {
      const formData = new FormData();
      formData.append('file', this.selectedAadharFile);
      this._http.post(AppConstants.uploadUrl, formData, { responseType: 'json' })
        .subscribe(
          (response: ImageDto) => {
            this.notificationService.showNotification("success", "File Uploaded Successfully!");
            this.aadharFileUploaded = true;
            this.imageData = response;
            console.dir(this.imageData);
            console.dir(this.imageData.path);
            console.dir(this.imageData?.path);
            console.dir(response?.path);
            this.createEmployeeForm.patchValue({
              aadharFilePath: this.imageData.path
            })
            console.dir(this.createEmployeeForm.value)
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
            this.createEmployeeForm.patchValue({
              pancardFilePath: this.imageData.path
            })
            console.dir(this.createEmployeeForm.value)
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