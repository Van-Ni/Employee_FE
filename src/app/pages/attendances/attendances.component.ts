import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Attendance } from 'src/app/model/attendance';
import { AttendanceService } from 'src/app/services/attendance/attendance.service';

declare var $: any; // Import thư viện jQuery
@Component({
  selector: 'app-attendances',
  templateUrl: './attendances.component.html',
  styleUrls: ['./attendances.component.css']
})
export class AttendancesComponent implements OnInit {
  attendances: Attendance[];
  user = JSON.parse (localStorage.getItem("user"));
  constructor(
    private attendanceService: AttendanceService,
    private cd: ChangeDetectorRef
  ) {
    console.log(this.user);
  }

  public idModal: number = 0;
  ngOnInit() {
    this.getAttendances()
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
  getAttendances(): void {
    this.resetDatable();
    this.attendanceService.getAttendances().subscribe((attendances) => {
      this.attendances = attendances;
      this.setDataTable();
    });
  }
}
