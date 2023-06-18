import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { UserProfileComponent } from "../../pages/user-profile/user-profile.component";
import { EmployeesComponent } from "src/app/pages/employees/employees.component";
import { TimeKeepingComponent } from "src/app/pages/time-keeping/time-keeping.component";
import { AuthGuard } from "src/app/services/auth/auth-guard";
import { DepartmentsComponent } from "src/app/pages/departments/departments.component";
import { PositionsComponent } from "src/app/pages/positions/positions.component";
import { ContractsComponent } from "src/app/pages/contracts/contracts.component";
import { AttendancesComponent } from "src/app/pages/attendances/attendances.component";
import { LeavesComponent } from "src/app/pages/leaves/leaves.component";
import { EmployeeSalarysComponent } from "src/app/pages/employee-salarys/employee-salarys.component";
import { HolidaysComponent } from "src/app/pages/holidays/holidays.component";
import { RewarddisciplinesComponent } from "src/app/pages/rewarddisciplines/rewarddisciplines.component";
import { SalarysComponent } from "src/app/pages/salarys/salarys.component";

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
      { path: "attendances", component: AttendancesComponent},
      { path: "leaves", component: LeavesComponent},
      { path: "employeesalarys", component: EmployeeSalarysComponent},
      { path: "holidays", component: HolidaysComponent},
      { path: "rewarddisciplines", component: RewarddisciplinesComponent},
      { path: "salarys", component: SalarysComponent},

    ]
  }
];
