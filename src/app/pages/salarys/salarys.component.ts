import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SalaryService } from 'src/app/services/salary/salary.service';
import { Salary } from 'src/app/model/salary';

declare var $: any; // Import thư viện jQuery
@Component({
  selector: 'app-salarys',
  templateUrl: './salarys.component.html',
  styleUrls: ['./salarys.component.css']
})
export class SalarysComponent implements OnInit {
  salarys: Salary[];
  user = JSON.parse (localStorage.getItem("user"));
  constructor(
    private salaryService: SalaryService,
    private cd: ChangeDetectorRef
  ) {
    console.log(this.user);
  }

  public idModal: number = 0;
  ngOnInit() {
    this.getSalarys();
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
  getSalarys(): void {
    this.resetDatable();
    this.salaryService.getSalarys().subscribe((salarys) => {
      this.salarys = salarys;
      this.setDataTable();
    });
  }
  createOrUpdateModelOpen(id: number) {
    this.idModal = id;
  }

  onSaveSal(sal: Salary) {
    if (sal.Id) {
      this.salaryService.updateSalary(sal.Id, sal).subscribe(
        (salary) => this.getSalarys(),
        (error) => {
          console.error(error);
        }
      );
    } else {
      this.salaryService
        .createSalary(sal)
        .subscribe(
          (salary) => this.getSalarys(),
          (error) => console.error(error)
        );
    }
    $("#exampleModal").modal("hide");
  }
}
