import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ContractService } from 'src/app/services/contract/contract.service';
import { Contract } from 'src/app/model/contract';

declare var $: any; // Import thư viện jQuery
@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.css']
})
export class ContractsComponent implements OnInit {
  contracts: Contract[];

  user = JSON.parse (localStorage.getItem("user"));

  constructor(
    private contractService: ContractService,
    private cd: ChangeDetectorRef
  ) {
    console.log(this.user);
  }

  public idModal: number = 0;
  ngOnInit() {
    this.getContracts();
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

  getContracts(): void {
    this.resetDatable();
    this.contractService.getContracts().subscribe((contracts) => {
      this.contracts = contracts;
      this.setDataTable();
    });
  }
  createOrUpdateModelOpen(id: number) {
    this.idModal = id;
  }

  onSaveCon(con: Contract) {
    if (con.Id) {
      this.contractService.updateContract(con.Id, con).subscribe(
        (contract) => this.getContracts(),
        (error) => {
          console.error(error);
        }
      );
    } else {
      this.contractService
        .createContract({ ...con, Id: +con.Type})
        .subscribe(
          (contract) => this.getContracts(),
          (error) => console.error(error)
        );
    }
  }
}
