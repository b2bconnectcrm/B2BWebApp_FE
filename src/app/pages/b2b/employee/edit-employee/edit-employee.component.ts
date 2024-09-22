import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators, AbstractControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { AppConstants } from 'src/app/constants/appConstants';
import { Employee } from 'src/app/models/employee.model';
import { ImageDto } from 'src/app/models/image.model';
import { Role } from 'src/app/models/role.model';
import { EmployeeService } from 'src/app/services/employee.service';
import { NotificationService } from 'src/app/services/notification.service';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss']
})
export class EditEmployeeComponent implements OnInit {
  url: any;
  bsValue = new Date();
  bsValue1 = new Date();
  selectedId: any;
  selectedType: any;
  showView: boolean;
  headerName: any;
  editEmployeeForm: UntypedFormGroup;
  bsConfiguration: Partial<BsDatepickerConfig>;
  selectedFile: File | null = null;
  imageData: ImageDto;
  roles: Array<Role> = [];
  aadharFileUploaded: boolean = false;
  pancardFileUploaded: boolean = false;
  employeeData: Employee;
  selectedRoleId: any;
  selectedAadharFile: any;
  aadharUrl: string | ArrayBuffer;
  selectedPancardFile: any;
  pancardUrl: string | ArrayBuffer;
  constructor(private activateRouter: ActivatedRoute, private router: Router, private fb: UntypedFormBuilder, 
    private roleService: RoleService , private _http: HttpClient, private employeeService: EmployeeService,
    private notificationService: NotificationService) {
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
    //this.getAllRoles();
    this.getEmployee();
  }

  getAllRoles() {
    this.roleService.getAllRoles().subscribe((data: any) => {
      this.roles = data;
    }, (error: any) => {

    })
  }
  getEmployee(){
    this.employeeService.getEmployee(this.selectedId).subscribe((data: any) => {
      this.employeeData = data;
      console.dir(this.employeeData);
      this.editEmployeeForm = this.fb.group({


        id: [ this.employeeData.id],
        name: [this.employeeData.name, Validators.required],
        email: [this.employeeData.email, Validators.required],
        mobile: [this.employeeData.mobile, Validators.required],
        aadharNumber: [this.employeeData.aadharNumber, Validators.required],
        pancardNumber: [this.employeeData.pancardNumber, Validators.required],
        username: [this.employeeData.username, Validators.required],
        department: [this.employeeData.department, Validators.required],
        aadharFilePath: [this.employeeData.aadharFilePath, Validators.required],
        pancardFilePath: [this.employeeData.pancardFilePath, Validators.required],
        role: [this.employeeData.role],
        roleId: [this.employeeData.role.id],
        address: this.fb.group({
          houseNo: [this.employeeData.address.houseNo, Validators.required],
          village: [this.employeeData.address.village, Validators.required],
          district: [this.employeeData.address.district, Validators.required],
          state: [this.employeeData.address.state, Validators.required],
          pincode: [this.employeeData.address.pincode, Validators.required],
        })
      });
     
      this.getAadharImagePath(this.employeeData.aadharFilePath);
      this.getPancardImagePath(this.employeeData.pancardFilePath);
      this.editEmployeeForm.markAllAsTouched();
      this.editEmployeeForm.updateValueAndValidity();
      this.getAllRolesByDepartment();
    }, (error: any) => {

    })
  }

  getAllRolesByDepartment() {
    this.roleService.getAllRolesByDepartment(this.editEmployeeForm.get('department').value).subscribe((data: any) => {
      this.roles = data;
      console.dir(this.roles);
    }, (error: any) => {

    })
  }

  updateEmployee() {
    if (this.editEmployeeForm.valid && this.headerName == "Update") {
      this.employeeService.updateEmployee(this.editEmployeeForm.value).subscribe((data: any) => {
        this.notificationService.showNotification("success","Employee Updated Successfully!");
        this.router.navigateByUrl("/admin/employeeList");
      }, (error: any) => {
        this.notificationService.showNotification("danger","Employee Not Updated");
      })
    } else if (this.headerName == "View") {
      this.router.navigateByUrl("/admin/employeeList");
    }

  }

  gotoBack() {
    this.router.navigateByUrl('/admin/employeeList');
  }

  get f(): { [key: string]: AbstractControl } {
    return this.editEmployeeForm.controls;
  }

  get g(): { [key: string]: AbstractControl } {
    let c = this.editEmployeeForm.controls.address as FormGroup
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
         this.imageData = response;
            console.dir(this.imageData);
            // this.editEmployeeForm.patchValue({
            //   propertyMap:  this.imageData?.imageName
            //  }) 
            //  this.updateProperty();
          },
          (error: HttpErrorResponse) => {
           console.dir(error);
          }
        );
    }else{
     // this.updateProperty();
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

 
  getAadharImagePath(image: string) {
    return AppConstants.GET_IMAGE_PATH(image);
  }

  getPancardImagePath(image: string) {
    return AppConstants.GET_IMAGE_PATH(image);
  }



  onRoleChange(event: any) {
    console.dir(event);
    console.dir(event.target.value);
    this.selectedRoleId = event.target.value;
    console.dir(this.selectedRoleId);
    console.dir(this.roles);
   const role= this.roles.find(role => role.id == this.selectedRoleId);

   console.dir(role)

    this.editEmployeeForm.patchValue({
      role: role,
      roleId: this.selectedRoleId
    })
  }

  uploadAadharImage() {
    if (this.selectedAadharFile) {
      const formData = new FormData();
      formData.append('file', this.selectedAadharFile);
      this._http.post(AppConstants.uploadUrl, formData, { responseType: 'json' })
        .subscribe(
          (response: ImageDto) => {
            this.notificationService.showNotification("success","File Uploaded Successfully!");
            this.aadharFileUploaded = true;
            this.imageData = response;
            console.dir(this.imageData);
            console.dir(this.imageData.imageName);
            console.dir(this.imageData?.imageName);
            console.dir(response?.imageName);
            this.editEmployeeForm.patchValue({
              aadharFilePath: this.imageData.imageName
            })
            console.dir( this.editEmployeeForm.value)
          },
          (error: HttpErrorResponse) => {
            this.notificationService.showNotification("danger","File Upload Failed");
            console.dir(error);
          }
        );
    }
  }

  uploadPancardImage() {
    if (this.selectedPancardFile) {
      const formData = new FormData();
      formData.append('file', this.selectedPancardFile);
      this._http.post(AppConstants.uploadUrl, formData, { responseType: 'json' })
        .subscribe(
          (response: ImageDto) => {
            this.notificationService.showNotification("success","File Uploaded Successfully!");
            this.pancardFileUploaded = true;
            this.imageData = response;
            console.dir(this.imageData);
            console.dir(this.imageData.imageName);
            console.dir(this.imageData?.imageName);
            console.dir(response?.imageName);
            this.editEmployeeForm.patchValue({
              pancardFilePath: this.imageData.imageName
            })
            console.dir( this.editEmployeeForm.value)
          },
          (error: HttpErrorResponse) => {
            this.notificationService.showNotification("danger","File Upload Failed");
            console.dir(error);
          }
        );
    }
  }
}