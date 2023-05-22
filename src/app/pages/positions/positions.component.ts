import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { EmployeeService } from "../../services/employee/employee.service";
import { Employee } from "../../model/employee";

declare var $: any; // Import thư viện jQuery
@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.css']
})
export class PositionsComponent implements OnInit {

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
