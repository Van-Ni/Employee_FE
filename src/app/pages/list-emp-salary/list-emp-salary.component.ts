import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmpSalaryService } from 'src/app/services/emp-salary/emp-salary.service';
import { EmployeeService } from 'src/app/services/employee/employee.service';

declare var $: any;
@Component({
  selector: 'app-list-emp-salary',
  templateUrl: './list-emp-salary.component.html',
  styleUrls: ['./list-emp-salary.component.scss']
})
export class ListEmpSalaryComponent implements OnInit {

  empSalaries: any[] = [];

  public timeForm:FormGroup;
  
  constructor(
    private empSalaryService: EmpSalaryService,
    private employeeService: EmployeeService,
    private formBuilder:FormBuilder,
  ) { 
    
  }

  ngOnInit() {
    // this.getEmployeeSalaries();
    this.timeForm = this.formBuilder.group({
      month: [null, Validators.required],
      year: [null, Validators.required]
    });
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
    var month = this.timeForm.controls['month'].value
    var year = this.timeForm.controls['year'].value
    this.empSalaryService.getAllEmployeeSalaries().subscribe(
      empSalaries => {
        this.empSalaries = empSalaries
        this.empSalaries = this.empSalaries.filter(empSalary => empSalary.month == month && empSalary.year == year)
        console.log(this.empSalaries)
        this.setDataTable();
      }
    );
  }

}
