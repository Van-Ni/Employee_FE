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

  getWorkingTime(checkInTime: string, checkOutTime: string): string {
    if (checkInTime && checkOutTime) {
      const startTime = new Date(`2000-01-01T${checkInTime}`);
      const endTime = new Date(`2000-01-01T${checkOutTime}`);
      const diff = endTime.getTime() - startTime.getTime();

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      return `${hours}:${minutes}:${seconds}`;
    }
    return '0';
  }

  getStatus(status: number): string {
    switch (status) {
      case 0:
        return 'Đi sớm';
      case 1:
        return 'Đi muộn';
      default:
        return '';
    }
  }

  formatTime(time: string | null): string {
    if (time) {
      return time.slice(0, 8); // Cắt chuỗi từ vị trí 0 đến vị trí 7 để lấy "HH:mm:ss"
    }
    return '';
  }
}
