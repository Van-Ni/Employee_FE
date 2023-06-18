import { DepartmentService } from "src/app/services/department/department.service";
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
import { Position } from "src/app/model/position";
import { ContractService } from "src/app/services/contract/contract.service";
import { PositionService } from "src/app/services/position/position.service";
declare var $: any;
@Component({
  selector: 'app-modal-department',
  templateUrl: './modal-department.component.html',
  styleUrls: ['./modal-department.component.scss']
})
export class ModalDepartmentComponent implements OnInit, OnChanges {

  @Input() id: number = 0;
  @Output() onSaveDep = new EventEmitter();
  department: Department;
  depForm: FormGroup;
  contracts: Contract[];
  positions: Position[];
  employees: Employee[];
  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private contractService: ContractService,
    private departmentService: DepartmentService,
    private positionService: PositionService
  ) {
    this.depForm = fb.group({});
  }

  ngOnInit() {
    this.getContracts();
    this.getEmployees();
    this.getPositions();
    this.depForm = this.fb.group({
      name: ["", Validators.required],
      description: ["", Validators.required],

    });
  }
  getContracts(): void {
    this.contractService.getContracts().subscribe((contracts) => {
      this.contracts = contracts;
    });
  }

  getEmployees(): void {
    this.employeeService.getEmployees().subscribe((employees) => {
      this.employees = employees;
    });
  }

  getPositions(): void {
    this.positionService.getPositions().subscribe((positions) => {
      this.positions = positions;
    });
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.id.currentValue !== 0) {
      this.departmentService
        .getDepartment(changes.id.currentValue)
        .subscribe((dep) => {
          console.log(dep);

          this.setForm(dep);
        });
    }
  }
  onSave() {
    if (this.depForm.valid) {
      const formData = this.depForm.getRawValue();

      if (this.id == 0) {
        this.onSaveDep.emit(formData);
      } else {
        formData.Id = this.id;
        this.onSaveDep.emit(formData);
      }
    } else {
      console.error("invalid state");
    }
  }

  setForm(dep: Department) {
    console.log(dep);
    this.department = dep;
    this.depForm.get("name").setValue(dep.Name);
    this.depForm.get("description").setValue(dep.Description);

  }
}
