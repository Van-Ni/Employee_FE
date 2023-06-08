import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DepartmentService } from 'src/app/services/department/department.service';
import { Department } from 'src/app/model/department';

declare var $: any; // Import thư viện jQuery
@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})

export class DepartmentsComponent implements OnInit {
  departments: Department[];

  user = JSON.parse (localStorage.getItem("user"));

  constructor(
    private departmentService: DepartmentService,

    private cd: ChangeDetectorRef
  ) {
    console.log(this.user);
  }

  public idModal: number = 0;
  ngOnInit() {
    this.getDepartments();
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
  getDepartments(): void {
    this.resetDatable();
    this.departmentService.getDepartments().subscribe((departments) => {
      this.departments = departments;
      this.setDataTable();
    });
  }
  createOrUpdateModelOpen(id: number) {
    this.idModal = id;
  }

  onSaveDep(dep: Department) {
    if (dep.Id) {
      this.departmentService.updateDepartment(dep.Id, dep).subscribe(
        (department) => this.getDepartments(),
        (error) => {
          console.error(error);
        }
      );
    } else {
      this.departmentService
        .createDepartment({ ...dep, Id: +dep.Id })
        .subscribe(
          (department) => this.getDepartments(),
          (error) => console.error(error)
        );
    }
    $("#exampleModal").modal("hide");
  }
}
