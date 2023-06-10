import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { EmployeeService } from "../../services/employee/employee.service";
import { Employee } from "../../model/employee";
import { AttendanceService } from 'src/app/services/attendance/attendance.service';

declare var $: any; // Import thư viện jQuery
@Component({
  selector: 'app-time-keeping',
  templateUrl: './time-keeping.component.html',
  styleUrls: ['./time-keeping.component.css']
})
export class TimeKeepingComponent implements OnInit {
  showCheckinButton: boolean = false;
  checkinButtonText: string = '';
  attendances: any[] = [];
  employee: any;
  user: any = JSON.parse(localStorage.getItem('user') || '{}');
  constructor(
    private attendanceService: AttendanceService,
    private employeeService: EmployeeService,
  ) { }

  ngOnInit() {
    this.checkTime();
    this.loadAttendances();
    this.getEmployee();
  }

  checkTime() {
    var currentTime = new Date();
    var currentHour = currentTime.getHours();

    if (currentHour < 10) {
      this.showCheckinButton = true;
      this.checkinButtonText = 'Chấm công vào';
    } else if (currentHour >17) {
      this.showCheckinButton = true;
      this.checkinButtonText = 'Chấm công ra';
    } else {
      this.showCheckinButton = false;
      this.checkinButtonText = '';
    }
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

  onCheckInOutClick() {
    if (this.checkinButtonText === 'Chấm công vào') {
      this.checkIn();
    } else if (this.checkinButtonText === 'Chấm công ra') {
      this.checkOut();
    }
  }

  checkIn() {
    // Gọi API CheckIn và cập nhật checkinButtonText
    this.attendanceService.checkIn(this.user.id).subscribe(() => {
      this.checkinButtonText = 'Chấm công ra';
      window.confirm("Chấm công thành công");
      this.loadAttendances();
    });
  }

  checkOut() {
    // Gọi API CheckOut và cập nhật checkinButtonText
    this.attendanceService.checkOut(this.user.id).subscribe(() => {
      this.checkinButtonText = 'Chấm công vào';
      window.confirm("Chấm công thành công");
      this.loadAttendances();
    });
  }

  loadAttendances(): void {
    this.attendanceService.getAttendances().subscribe(
      attendances => {
        this.attendances = attendances;
      }
    );
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
  getEmployee(): void {
    this.employeeService.getEmployee(this.user.employee_id).subscribe((employee) => {
      console.log(employee);
      this.employee = employee;
    });
  }
  

}
