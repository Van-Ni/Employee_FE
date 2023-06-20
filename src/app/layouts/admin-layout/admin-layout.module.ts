import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EmployeesComponent } from 'src/app/pages/employees/employees.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ModalEmployeeComponent } from 'src/app/pages/employees/components/modal-employee/modal-employee.component';
import { TimeKeepingComponent } from 'src/app/pages/time-keeping/time-keeping.component';
import { DepartmentsComponent } from 'src/app/pages/departments/departments.component';
import { PositionsComponent } from 'src/app/pages/positions/positions.component';
import { ContractsComponent } from 'src/app/pages/contracts/contracts.component';
import { ModalDepartmentComponent } from 'src/app/pages/departments/components/modal-department/modal-department.component';
import { ModalPositionComponent } from 'src/app/pages/positions/components/modal-position/modal-position.component';
import { ModalContractComponent } from 'src/app/pages/contracts/components/modal-contract/modal-contract.component';
import { EmpSalaryComponent } from 'src/app/pages/emp-salary/emp-salary.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatCardModule,
    MatSelectModule,
    MatButtonModule,
    MatRadioModule,
    MatCheckboxModule,
    ReactiveFormsModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    EmployeesComponent,
    ModalEmployeeComponent,
    TimeKeepingComponent,
    DepartmentsComponent,
    PositionsComponent,
    ContractsComponent,
    ModalDepartmentComponent,
    ModalPositionComponent,
    ModalContractComponent,
    EmpSalaryComponent,
  ],
})

export class AdminLayoutModule {}
