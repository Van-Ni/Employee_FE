import { ContractService } from "src/app/services/contract/contract.service";
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Employee } from "src/app/model/employee";
import { EmployeeService } from "src/app/services/employee/employee.service";
import { Contract } from "src/app/model/contract";
import { Department } from "src/app/model/department";
import { DepartmentService } from "src/app/services/department/department.service";
import { Position } from "src/app/model/position";
import { PositionService } from "src/app/services/position/position.service";
declare var $: any;

@Component({
  selector: 'app-modal-contract',
  templateUrl: './modal-contract.component.html',
  styleUrls: ['./modal-contract.component.css']
})
export class ModalContractComponent implements OnInit, OnChanges {

  @Input() id: number = 0;
  @Output() onSaveCon = new EventEmitter();
  conForm: FormGroup;
  contracts: Contract[];
  departments: Department[];
  positions: Position[];
  department: Department;
  employees: Employee[];
  contract: Contract;
  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private contractService: ContractService,
    private departmentService: DepartmentService,
    private positionService: PositionService
  ) {
    this.conForm = fb.group({});
  }

  ngOnInit() {
    this.getContracts();
    this.getDepartments();
    this.getPositions();
    this.conForm = this.fb.group({
      type: ["", Validators.required],
      startday: ["", Validators.required],
      endday: ["", Validators.required],
      note: ["", Validators.required],
    });
  }
  getContracts(): void {
    this.contractService.getContracts().subscribe((contracts) => {
      this.contracts = contracts;
    });
  }
  getDepartments(): void {
    this.departmentService.getDepartments().subscribe((departments) => {
      this.departments = departments;
    });
  }

  getPositions(): void {
    this.positionService.getPositions().subscribe((positions) => {
      this.positions = positions;
    });
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.id.currentValue !== 0) {
      this.contractService
        .getContract(changes.id.currentValue)
        .subscribe((con) => {
          console.log(con);

          this.setForm(con);
        });
    }
  }
  onSave() {
    if (this.conForm.valid) {
      const formData = this.conForm.getRawValue();
      console.log(formData);
      formData.type = parseInt(formData.type);
      formData.note = parseInt(formData.note);
      if (this.id == 0) {
        this.onSaveCon.emit(formData);
      } else {
        formData.Id = this.id;
        this.onSaveCon.emit(formData);
      }
    } else {
      console.error("invalid state");
    }
  }

  setForm(con: Contract) {
    console.log(con);
    this.contract = con;
    this.conForm.get("type").setValue(con.Type);
    this.conForm.get("startday").setValue(con.StartDate);
    this.conForm.get("endday").setValue(con.EndDate);
    this.conForm.get("note").setValue(con.Note);
  }

}
