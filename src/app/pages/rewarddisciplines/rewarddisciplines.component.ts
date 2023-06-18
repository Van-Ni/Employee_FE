import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RewarddisciplineService } from 'src/app/services/rewarddiscipline/rewarddiscipline.service';
import { Rewarddiscipline } from 'src/app/model/rewarddiscipline';

declare var $: any; // Import thư viện jQuery
@Component({
  selector: 'app-rewarddisciplines',
  templateUrl: './rewarddisciplines.component.html',
  styleUrls: ['./rewarddisciplines.component.css']
})
export class RewarddisciplinesComponent implements OnInit {
  rewarddisciplines: Rewarddiscipline[];
  user = JSON.parse (localStorage.getItem("user"));
  constructor(
    private rewarddisciplineService: RewarddisciplineService,
    private cd: ChangeDetectorRef
  ) {
    console.log(this.user);
  }

  public idModal: number = 0;
  ngOnInit() {
    this.getRewarddisciplines();
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
  getRewarddisciplines(): void {
    this.resetDatable();
    this.rewarddisciplineService.getRewarddisciplines().subscribe((rewarddisciplines) => {
      this.rewarddisciplines = rewarddisciplines;
      this.setDataTable();
    });
  }
  createOrUpdateModelOpen(id: number) {
    this.idModal = id;
  }
  onSaveRew(rew: Rewarddiscipline) {
    if (rew.Id) {
      this.rewarddisciplineService.updateRewarddiscipline(rew.Id, rew).subscribe(
        (rewarddiscipline) => this.getRewarddisciplines(),
        (error) => {
          console.error(error);
        }
      );
    } else {
      this.rewarddisciplineService
        .createRewarddiscipline(rew)
        .subscribe(
          (rewarddiscipline) => this.getRewarddisciplines(),
          (error) => console.error(error)
        );
    }
    $("#exampleModal").modal("hide");
  }
}
