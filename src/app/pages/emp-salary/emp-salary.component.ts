import { Component, OnInit } from '@angular/core';
import { AttendanceService } from 'src/app/services/attendance/attendance.service';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { EmpSalaryService } from 'src/app/services/emp-salary/emp-salary.service';
import { TransitionCheckState } from '@angular/material/checkbox';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EmpSalary } from 'src/app/model/emp-salary';

declare var $: any;
@Component({
  selector: 'app-emp-salary',
  templateUrl: './emp-salary.component.html',
  styleUrls: ['./emp-salary.component.scss']
})
export class EmpSalaryComponent implements OnInit {
  empSalaries: any[] = [];

  public timeForm: FormGroup;

  constructor(
    private empSalaryService: EmpSalaryService,
    private employeeService: EmployeeService,
    private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.timeForm = this.formBuilder.group({
      month: [null, Validators.required],
      year: [null, Validators.required]
    });
  }
  ngAfterViewInit() {
    this.resetDatable();
    this.setDataTable();
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
  curMonth : any ;
  curYear : any ;
  getEmployeeSalaries(): void {
    this.resetDatable();
    this.curMonth = this.timeForm.controls['month'].value;
    this.curYear = this.timeForm.controls['year'].value;
    if (!this.curMonth || !this.curYear) {
      var currentDate = new Date();
      this.curMonth = currentDate.getMonth() + 1;
      this.curYear = currentDate.getFullYear();
    }
    this.empSalaryService.getEmployeesByMonthYear(this.curMonth, this.curYear).subscribe(
      (empSalaries) => {
        this.empSalaries = empSalaries
        this.setDataTable();
      }
    );
  }

  isChecked = false;
  checkuncheckall() {
    if (this.isChecked == true) {
      this.isChecked = false;
    } else {
      this.isChecked = true;
    }

  }


  emps: any[] = []
  pushToArray(event: any): void {
    if (event.target.checked) {
      let empToPush = this.empSalaries.find(empSalary => empSalary.Id == event.target.value);
      this.emps.push(empToPush.Id)
      console.log(this.emps)
    }
  }

  calcSalary(): void {
    this.resetDatable();
    var month = this.timeForm.controls['month'].value;
    var year = this.timeForm.controls['year'].value;
    console.log({
      Month: month,
      Year: year,
      Ids: this.emps
    });
    this.empSalaryService.calculateSalary({
      Month: this.curMonth,
      Year: this.curYear,
      Ids: this.emps
    }).subscribe(
      (empSalaries) => {
        this.emps = [];
        this.empSalaries = empSalaries
        this.getEmployeeSalaries();
        this.setDataTable();
      }
    );
  }

}
