import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LeaveService } from 'src/app/services/leave/leave.service';
import { Leave } from 'src/app/model/leave';

declare var $: any; // Import thư viện jQuery
@Component({
  selector: 'app-leaves',
  templateUrl: './leaves.component.html',
  styleUrls: ['./leaves.component.css']
})
export class LeavesComponent implements OnInit {
  leaves: Leave[];
  user = JSON.parse (localStorage.getItem("user"));
  constructor(
    private leaveService: LeaveService,
    private cd: ChangeDetectorRef
  ) {
    console.log(this.user);
   }

  public idModal: number = 0;
  ngOnInit() {
    this.getLeaves();
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
  getLeaves(): void {
    this.resetDatable();
    this.leaveService.getLeaves().subscribe((leaves) => {
      this.leaves = leaves;
      this.setDataTable();
    });
  }
  createOrUpdateModelOpen(id: number) {
    this.idModal = id;
  }
  onSaveLea(lea: Leave) {
    if (lea.Id) {
      this.leaveService.updateLeave(lea.Id, lea).subscribe(
        (leave) => this.getLeaves(),
        (error) => {
          console.error(error);
        }
      );
    } else {
      this.leaveService
        .createLeave(lea)
        .subscribe(
          (leave) => this.getLeaves(),
          (error) => console.error(error)
        );
    }
    $("#exampleModal").modal("hide");
  }
}
