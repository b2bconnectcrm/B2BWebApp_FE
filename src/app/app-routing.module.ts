import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";

import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from "./layouts/auth-layout/auth-layout.component";
import { PresentationComponent } from "./pages/presentation/presentation.component";
import { DashboardComponent } from "./pages/b2b/dashboard/dashboard.component";
import { EmployeeListComponent } from "./pages/b2b/employee/employee-list/employee-list.component";
import { LeadListComponent } from "./pages/b2b/lead/lead-list/lead-list.component";
import { PropertyListComponent } from "./pages/b2b/property/property-list/property-list.component";
import { AddPropertyComponent } from "./pages/b2b/property/add-property/add-property.component";
import { AddLeadComponent } from "./pages/b2b/lead/add-lead/add-lead.component";
import { EditLeadComponent } from "./pages/b2b/lead/edit-lead/edit-lead.component";
import { EditPropertyComponent } from "./pages/b2b/property/edit-property/edit-property.component";
import { OtpComponent } from "./pages/b2b/otp/otp.component";
import { LoginComponent } from "./pages/b2b/login/login.component";
import { AddEmployeeComponent } from "./pages/b2b/employee/add-employee/add-employee.component";
import { EditEmployeeComponent } from "./pages/b2b/employee/edit-employee/edit-employee.component";
import { RoleListComponent } from "./pages/b2b/role/role-list/role-list.component";
import { AddRoleComponent } from "./pages/b2b/role/add-role/add-role.component";
import { UpdateRoleComponent } from "./pages/b2b/role/update-role/update-role.component";
import { DealsListComponent } from "./pages/b2b/deals/deals-list/deals-list.component";
import { CreateDealsComponent } from "./pages/b2b/deals/create-deals/create-deals.component";
import { UpdateDealsComponent } from "./pages/b2b/deals/update-deals/update-deals.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full"
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "otp",
    component: OtpComponent,
  },
  {
    path: "presentation",
    component: PresentationComponent
  },
  {
    path: "admin",
    component: AdminLayoutComponent,
    children: [
      {
        path: "dashboard",
        component: DashboardComponent
      },
      {
        path: "employeeList",
        component: EmployeeListComponent
      },
      {
        path: "add_employee",
        component: AddEmployeeComponent
      },
      {
        path: "edit_employee/:id/:type",
        component: EditEmployeeComponent
      },
      {
        path: "leads",
        component: LeadListComponent
      },

      { path: "add_lead", component: AddLeadComponent },
      { path: "edit_lead/:id/:type", component: EditLeadComponent },
      {
        path: "properties",
        component: PropertyListComponent
      },
      { path: "add_property", component: AddPropertyComponent },
      { path: "edit_property/:id/:type", component: EditPropertyComponent },
      {
        path: "add_property",
        component: AddPropertyComponent
      },

      {
        path: "roleList",
        component: RoleListComponent
      },
      {
        path: "add_role",
        component: AddRoleComponent
      },
      {
        path: "edit_role/:id",
        component: UpdateRoleComponent
      },
      {
        path: "deals-list",
        component: DealsListComponent
      },
      {
        path: "create-deals",
        component: CreateDealsComponent
      },
      {
        path: "update-deals",
        component: UpdateDealsComponent
      },
      {
        path: "dashboards",
        loadChildren: () => import('./pages/dashboards/dashboards.module').then(m => m.DashboardsModule)

      },
      {
        path: "components",
        loadChildren: () => import('./pages/components/components.module').then(m => m.ComponentsModule)
      },
      {
        path: "forms",
        loadChildren: () => import('./pages/forms/forms.module').then(m => m.FormsModules)
      },
      {
        path: "tables",
        loadChildren: () => import('./pages/tables/tables.module').then(m => m.TablesModule)
      },
      {
        path: "maps",
        loadChildren: () => import('./pages/maps/maps.module').then(m => m.MapsModule)
      },
      {
        path: "widgets",
        loadChildren: () => import('./pages/widgets/widgets.module').then(m => m.WidgetsModule)
      },
      {
        path: "charts",
        loadChildren: () => import('./pages/charts/charts.module').then(m => m.ChartsModule)
      },
      {
        path: "calendar",
        loadChildren: () => import('./pages/calendar/calendar.module').then(m => m.CalendarModule)
      },
      {
        path: "examples",
        loadChildren: () => import('./pages/examples/examples.module').then(m => m.ExamplesModule)
      }
    ]
  },
  // {
  //   path: "",
  //   component: AuthLayoutComponent,
  //   children: [
  //     {
  //       path: "",
  //       loadChildren: () => import('./layouts/auth-layout/auth-layout.module').then(m => m.AuthLayoutModule)
  //     }
  //   ]
  // },
  {
    path: "**",
    redirectTo: "login"
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
