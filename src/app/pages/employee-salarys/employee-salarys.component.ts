import { Component, OnInit } from '@angular/core';
import { EmployeeSalary } from 'src/app/model/employee-salary';

declare var $: any; // Import thư viện jQuery
@Component({
  selector: 'app-employee-salarys',
  templateUrl: './employee-salarys.component.html',
  styleUrls: ['./employee-salarys.component.css']
})
export class EmployeeSalarysComponent implements OnInit {
  employeesalarys: EmployeeSalary[];
  user = JSON.parse (localStorage.getItem("user"));
  constructor() { }

  public idModal: number = 0;
  ngOnInit() {
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
  resetDatable() : void{
    $(document).ready(function () {
      $("#myTable").DataTable().destroy();
    });
  }
}
