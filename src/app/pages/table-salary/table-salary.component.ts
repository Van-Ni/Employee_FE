import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmpSalaryService } from 'src/app/services/emp-salary/emp-salary.service';
import { EmployeeService } from 'src/app/services/employee/employee.service';

declare var $: any;

@Component({
  selector: 'app-table-salary',
  templateUrl: './table-salary.component.html',
  styleUrls: ['./table-salary.component.scss']
})
export class TableSalaryComponent implements OnInit {

  empSalaries: any[] = [];
  user = JSON.parse (localStorage.getItem("user"));

  public timeForm:FormGroup;
  
  constructor(
    private empSalaryService: EmpSalaryService,
    private employeeService: EmployeeService,
    private formBuilder:FormBuilder,
  ) { 
    
  }

  ngOnInit() {
    this.getEmployeeSalaries();
    
  }

  setDataTable(): void {
    // $("#myTable").DataTable().destroy();
    $(document).ready(function () {
      $("#myTable").DataTable({
        language: {
          paginate: {
            previous: "Trước",
            next: "Tiếp",
          },
          search: "Tìm kiếm: ",
        },
      });
    });
  }
  resetDatable(): void {
    $(document).ready(function () {
      $("#myTable").DataTable().destroy();
    });
  }

  getEmployeeSalaries(): void {
    this.resetDatable();
    this.empSalaryService.getSalary(this.user.employee_id).subscribe(
      empSalary => {
        this.empSalaries.push(empSalary);
        this.setDataTable()
      }
    );
  }

}
