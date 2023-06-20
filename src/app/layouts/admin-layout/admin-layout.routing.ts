import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { UserProfileComponent } from "../../pages/user-profile/user-profile.component";
import { EmployeesComponent } from "src/app/pages/employees/employees.component";
import { TimeKeepingComponent } from "src/app/pages/time-keeping/time-keeping.component";
import { AuthGuard } from "src/app/services/auth/auth-guard";
import { DepartmentsComponent } from "src/app/pages/departments/departments.component";
import { PositionsComponent } from "src/app/pages/positions/positions.component";
import { ContractsComponent } from "src/app/pages/contracts/contracts.component";
import { EmpSalaryComponent } from "src/app/pages/emp-salary/emp-salary.component";

export const AdminLayoutRoutes: Routes = [
  {
    path: "",
    canActivate: [AuthGuard],
    children: [
      { path: "dashboard", component: DashboardComponent, },
      { path: "user-profile", component: UserProfileComponent },
      { path: "employee", component: EmployeesComponent },
      { path: "time-keeping", component: TimeKeepingComponent },
      { path: "departments", component: DepartmentsComponent },
      { path: "positions", component: PositionsComponent},
      { path: "contracts", component: ContractsComponent},
      { path: "emp-salary", component: EmpSalaryComponent},
    ]
  }
];
