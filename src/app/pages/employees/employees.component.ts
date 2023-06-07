import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { EmployeeService } from "../../services/employee/employee.service";
import { Employee } from "../../model/employee";

declare var $: any; // Import thư viện jQuery
@Component({
  selector: "app-employees",
  templateUrl: "./employees.component.html",
  styleUrls: ["./employees.component.css"],
})

export class EmployeesComponent implements OnInit {
  employees: Employee[];

  constructor(
    private employeeService: EmployeeService,

    private cd: ChangeDetectorRef
  ) {}

  public idModal: number = 0;
  ngOnInit() {
    this.getEmployees();
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
  getEmployees(): void {
    this.resetDatable();
    this.employeeService.getEmployees().subscribe((employees) => {
      this.employees = employees;
      this.setDataTable();
    });
  }
  createOrUpdateModelOpen(id: number) {
    this.idModal = id;
  }
  // deleteEmployee(id: number, employee: Employee) {
  //   this.idModal = id;
  // }
  onSaveEmp(emp: Employee) {
    if (emp.Id) {
      this.employeeService.updateEmployee(emp.Id, emp).subscribe(
        (employee) => this.getEmployees(),
        (error) => {
          console.error(error);
        }
      );
    } else {
      this.employeeService
        .createEmployee({ ...emp, Gender: +emp.Gender })
        .subscribe(
          (employee) => this.getEmployees(),
          (error) => console.error(error)
        );
    }
    $("#exampleModal").modal("hide");
  }
}
