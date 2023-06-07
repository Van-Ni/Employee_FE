import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PositionService } from 'src/app/services/position/position.service';
import { Position } from 'src/app/model/position';

declare var $: any;
@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.css']
})
export class PositionsComponent implements OnInit {
  positions: Position[];
  constructor(
    private positionService: PositionService,
    private cd: ChangeDetectorRef
  ) { }

  public idModal: number = 0;
  ngOnInit() {
    this.getPositions();
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
  getPositions(): void {
    this.resetDatable();
    this.positionService.getPositions().subscribe((positions) => {
      this.positions = positions;
      this.setDataTable();
    })
  }
  createOrUpdateModelOpen(id: number) {
    this.idModal = id;
  }
  onSavePos(pos: Position) {
    if (pos.Id) {
      this.positionService.updatePosition(pos.Id, pos)
        .subscribe(
          (position) => this.getPositions(),
          (error) => {
            console.error(error);
          }
        );
    } else {
      this.positionService
        .createPosition({ ...pos, Id: +pos.Name})
        .subscribe(
          (position) => this.getPositions(),
          (error) => console.error(error)
        );
    }
    $("#exampleModal").modal("hide");
  }
}
