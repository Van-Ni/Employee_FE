import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { EmployeeService } from "../../services/employee/employee.service";
import { Employee } from "../../model/employee";

declare var $: any; // Import thư viện jQuery
@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})

export class DepartmentsComponent implements OnInit {



  constructor(

    private cd: ChangeDetectorRef
  ) {}

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
