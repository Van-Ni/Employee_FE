import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { UserProfileComponent } from "../../pages/user-profile/user-profile.component";
import { EmployeesComponent } from "src/app/pages/employees/employees.component";
import { AuthGuard } from "src/app/services/auth/auth-guard";

export const AdminLayoutRoutes: Routes = [
  {
    path: "",
    canActivate: [AuthGuard],
    children: [
      { path: "dashboard", component: DashboardComponent, },
      { path: "user-profile", component: UserProfileComponent },
      { path: "employee", component: EmployeesComponent },
    ]
  }
];
