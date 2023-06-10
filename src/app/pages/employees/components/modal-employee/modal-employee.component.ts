import { DepartmentService } from "./../../../../services/department/department.service";
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
import { Employee } from "../../../../model/employee";
import { EmployeeService } from "../../../../services/employee/employee.service";
import { Contract } from "../../../../model/contract";
import { Department } from "../../../../model/department";
import { Position } from "../../../../model/position";
import { ContractService } from "../../../../services/contract/contract.service";
import { PositionService } from "../../../../services/position/position.service";
declare var $: any;
@Component({
  selector: "app-modal-employee",
  templateUrl: "./modal-employee.component.html",
  styleUrls: ["./modal-employee.component.scss"],
})
export class ModalEmployeeComponent implements OnInit, OnChanges {
  @Input() id: number = 0;
  @Output() onSaveEmp = new EventEmitter();
  employee: Employee;
  empForm: FormGroup;
  contracts: Contract[];
  departments: Department[];
  positions: Position[];
  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private contractService: ContractService,
    private departmentService: DepartmentService,
    private positionService: PositionService
  ) {
    this.empForm = fb.group({});
  }

  ngOnInit() {
    this.getContracts();
    this.getDepartments();
    this.getPositions();
    this.empForm = this.fb.group({
      fullname: ["", Validators.required],
      gender: [0, Validators.required],
      email: ["", Validators.required],
      phone: ["", Validators.required],
      address: ["", Validators.required],
      birthday: ["", Validators.required],
      joindate: ["", Validators.required],
      status: [0, Validators.required],
      department_id: ["", Validators.required],
      position_id: ["", Validators.required],
      contract_Id: ["", Validators.required],
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
      this.employeeService
        .getEmployee(changes.id.currentValue)
        .subscribe((emp) => {
          console.log(emp);

          this.setForm(emp);
        });
    }
  }
  onSave() {
    if (this.empForm.valid) {
      const formData = this.empForm.getRawValue();
      formData.gender = parseInt(formData.gender);
      formData.status = parseInt(formData.status);
      if (this.id == 0) {
        this.onSaveEmp.emit(formData);
      } else {
        formData.Id = this.id;
        this.onSaveEmp.emit(formData);
      }
    } else {
      console.error("invalid state");
    }
  }

  setForm(emp: Employee) {
    console.log(emp);
    this.employee = emp;
    this.empForm.get("fullname").setValue(emp.Fullname);
    this.empForm.get("gender").setValue(emp.Gender ? "1" : "0");
    this.empForm.get("email").setValue(emp.Email);
    this.empForm.get("phone").setValue(emp.Phone);
    this.empForm.get("address").setValue(emp.Address);
    this.empForm
      .get("birthday")
      .setValue(new Date(emp.Birthday).toISOString().substring(0, 10));
    this.empForm
      .get("joindate")
      .setValue(new Date(emp.JoinDate).toISOString().substring(0, 10));
    this.empForm.get("status").setValue(emp.Status ? "0" : "1");
    this.empForm.get("department_id").setValue(emp.DepartmentId);
    this.empForm.get("position_id").setValue(emp.PositionId);
    this.empForm.get("contract_Id").setValue(emp.ContractId);
  }
}
