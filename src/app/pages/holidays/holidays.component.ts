import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HolidayService } from 'src/app/services/holiday/holiday.service';
import { Holiday } from 'src/app/model/holiday';

declare var $: any; // Import thư viện jQuery
@Component({
  selector: 'app-holidays',
  templateUrl: './holidays.component.html',
  styleUrls: ['./holidays.component.css']
})
export class HolidaysComponent implements OnInit {
  holidays: Holiday[];
  user = JSON.parse (localStorage.getItem("user"));
  constructor(
    private holidayService: HolidayService,
    private cd: ChangeDetectorRef
  ) {
    console.log(this.user);
  }

  public idModal: number = 0;
  ngOnInit() {
    this.getHolidays();
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
  getHolidays(): void {
    this.resetDatable();
    this.holidayService.getHolidays().subscribe((holidays) => {
      this.holidays = holidays;
      this.setDataTable();
    });
  }
  deleteHol(id: number): void {
    this.holidayService.deleteHoliday(id).subscribe((holidays) => {
      this.getHolidays();
    });
  }
  createOrUpdateModelOpen(id: number) {
    this.idModal = id;
  }

  onSaveHol(hol: Holiday) {
    if (hol.Id) {
      this.holidayService.updateHoliday(hol.Id, hol).subscribe(
        (holiday) => this.getHolidays(),
        (error) => {
          console.error(error);
        }
      );
    } else {
      this.holidayService
        .createHoliday(hol)
        .subscribe(
          (holiday) => this.getHolidays(),
          (error) => console.error(error)
        );
    }
    $("#exampleModal").modal("hide");
  }
}
