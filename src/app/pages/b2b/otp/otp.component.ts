import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent implements OnInit {

  otp: any;
  otpForm: FormGroup;
  constructor(private router: Router, private fb: UntypedFormBuilder, private userService: UserService,
    private notificationService: NotificationService) {

    this.otpForm = this.fb.group({
      username: ['', Validators.required],
      mobile: ['', Validators.required],
      otp: ['', Validators.required],

    })
  }
  ngOnInit(): void {
    this.userService.currentUser.subscribe((data: any) =>{
      this.otp = data?.otp;
    })
    this.userService.currentData.subscribe(data => {
      console.log(data);  // Access the shared data
      this.otpForm.patchValue({
        username: data.username,
        mobile: data.mobile
      });
    });
  }

  onOtpChange(value: any) {
    console.log(value);
    this.otpForm.patchValue({
      otp: value
    })
  }

  otpSubmit() {
    console.dir(this.otpForm.value);
    if (this.otpForm.valid) {
      this.userService.checkOtp(this.otpForm.value).subscribe(res => {
        this.notificationService.showNotification("success","OTP verified successfully!");
        this.router.navigateByUrl("/admin/dashboard");
      }, error => {
        this.notificationService.showNotification("danger","Please Enter Valid OTP");
      })
    } else {
      this.notificationService.showNotification("danger","Please Enter Valid OTP");
    }
  }
}