import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { ToastrModule } from "ngx-toastr";
import { TagInputModule } from "ngx-chips";
import { CollapseModule } from 'ngx-bootstrap/collapse';

import { AppComponent } from "./app.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from "./layouts/auth-layout/auth-layout.component";
import { PresentationModule } from "./pages/presentation/presentation.module";

import { BrowserModule } from '@angular/platform-browser';
import { ComponentsModule } from "./components/components.module";

import { AppRoutingModule } from './app-routing.module';
import { LeadListComponent } from './pages/b2b/lead/lead-list/lead-list.component';
import { AddLeadComponent } from './pages/b2b/lead/add-lead/add-lead.component';
import { EditLeadComponent } from './pages/b2b/lead/edit-lead/edit-lead.component';
import { AddPropertyComponent } from './pages/b2b/property/add-property/add-property.component';
import { PropertyListComponent } from './pages/b2b/property/property-list/property-list.component';
import { EditPropertyComponent } from './pages/b2b/property/edit-property/edit-property.component';
import { EditEmployeeComponent } from './pages/b2b/employee/edit-employee/edit-employee.component';
import { EmployeeListComponent } from './pages/b2b/employee/employee-list/employee-list.component';
import { AddEmployeeComponent } from './pages/b2b/employee/add-employee/add-employee.component';
import { DashboardComponent } from './pages/b2b/dashboard/dashboard.component';
import { OtpComponent } from './pages/b2b/otp/otp.component';
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { OnlyNumberDirective } from "./services/only-number.directive";
import { NgOtpInputModule } from "ng-otp-input";
import { LoginComponent } from './pages/b2b/login/login.component';
import { RoleListComponent } from './pages/b2b/role/role-list/role-list.component';
import { AddRoleComponent } from './pages/b2b/role/add-role/add-role.component';
import { UpdateRoleComponent } from './pages/b2b/role/update-role/update-role.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    LeadListComponent,
    AddLeadComponent,
    EditLeadComponent,
    AddPropertyComponent,
    PropertyListComponent,
    EditPropertyComponent,
    EditEmployeeComponent,
    EmployeeListComponent,
    AddEmployeeComponent,
    DashboardComponent,
    OtpComponent,
    OnlyNumberDirective,
    LoginComponent,
    RoleListComponent,
    AddRoleComponent,
    UpdateRoleComponent
  ],
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    ComponentsModule,
    BsDropdownModule.forRoot(),
    AppRoutingModule,
    ToastrModule.forRoot(),
    CollapseModule.forRoot(),
    TagInputModule,
    PresentationModule,
    BrowserModule,
    AppRoutingModule,  
    BsDatepickerModule.forRoot(),
    ReactiveFormsModule,
    NgOtpInputModule
  ],
  providers: [],
  schemas:[CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
