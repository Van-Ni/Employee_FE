import { PositionService } from 'src/app/services/position/position.service';
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
import { DepartmentService } from 'src/app/services/department/department.service';
import { Position } from "src/app/model/position";
import { ContractService } from "src/app/services/contract/contract.service";
declare var $: any;
@Component({
  selector: 'app-modal-position',
  templateUrl: './modal-position.component.html',
  styleUrls: ['./modal-position.component.css']
})
export class ModalPositionComponent implements OnInit, OnChanges {

  @Input() id: number = 0;
  @Output() onSavePos = new EventEmitter();
  posForm: FormGroup;
  contracts: Contract[];
  departments: Department[];
  positions: Position[];
  department: Department;
  employees: Employee[];
  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private contractService: ContractService,
    private departmentService: DepartmentService,
    private positionService: PositionService
  ) {
    this.posForm = fb.group({});
  }

  ngOnInit() {
    this.getContracts();
    this.getDepartments();
    this.getPositions();
    this.posForm = this.fb.group({
      name: ["", Validators.required],
      description: ["", Validators.required],
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
      this.positionService
        .getPosition(changes.id.currentValue)
        .subscribe((pos) => {
          console.log(pos);

          this.setForm(pos);
        });
    }
  }
  onSave() {
    if (this.posForm.valid) {
      const formData = this.posForm.getRawValue();
      console.log(formData);
      formData.id = parseInt(formData.id);
      formData.name = parseInt(formData.name);
      if (this.id == 0) {
        this.onSavePos.emit(formData);
      } else {
        formData.Id = this.id;
        this.onSavePos.emit(formData);
      }
    } else {
      console.error("invalid state");
    }
  }

  setForm(pos: Department) {
    this.department = pos;
    this.posForm.get("name").setValue(pos.Name);
    this.posForm.get("description").setValue(pos.Description);
  }
}
