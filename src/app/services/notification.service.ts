import { Injectable } from '@angular/core';
import { ToastrService } from "ngx-toastr";
@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(  public toastr: ToastrService) { }

  showNotification(type: string, message: string) {
    const color = Math.floor(Math.random() * 5 + 1);
   
    if (type === "success") {
      this.toastr.show(
        `<span class="alert-icon" data-notify="icon">Success:</span> <div class="alert-text"</div> <span class="alert-title" data-notify="title"></span> <span data-notify="message">${message}</span></div>`,
        "",
        {
          timeOut: 4000,
          closeButton: true,
          enableHtml: true,
          tapToDismiss: false,
          titleClass: "alert-title",
          positionClass: "toast-top-center",
          toastClass:
            "ngx-toastr alert alert-dismissible alert-success alert-notify"
        }
      );
    }
    if (type === "danger") {
      this.toastr.show(
        `<span class="alert-icon" data-notify="icon">Error:</span> <div class="alert-text"</div> <span class="alert-title" data-notify="title"></span> <span data-notify="message">${message}</span></div>`,
        "",
       
        {
          timeOut: 4000,
          closeButton: true,
          enableHtml: true,
          tapToDismiss: false,
          titleClass: "alert-title",
          positionClass: "toast-top-center",
          toastClass:
            "ngx-toastr alert alert-dismissible alert-danger alert-notify"
        }
      );
    }
   
    
  }
}
