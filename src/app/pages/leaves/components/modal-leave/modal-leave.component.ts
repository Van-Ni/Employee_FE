import { LeaveService } from "src/app/services/leave/leave.service";
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
import { Leave } from "src/app/model/leave";
declare var $: any;

@Component({
  selector: 'app-modal-leave',
  templateUrl: './modal-leave.component.html',
  styleUrls: ['./modal-leave.component.css']
})
export class ModalLeaveComponent implements OnInit, OnChanges {
  @Input() id: number = 0;
  @Output() onSaveLea = new EventEmitter();
  leave: Leave;
  leaForm: FormGroup;
  employees: Employee[];
  user = JSON.parse (localStorage.getItem("user"));
  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private leaveService: LeaveService
  ) {
    this.leaForm = fb.group({});
  }

  ngOnInit() {
    this.getEmployees();
    this.leaForm = this.fb.group({
      employee_id: ["", Validators.required],
      leave_date: ["", Validators.required],
      reason: ["", Validators.required],
      approved: ["", Validators.required],
      leave_type: ["", Validators.required],
    });
  }
  getEmployees(): void {
    this.employeeService.getEmployees().subscribe((employees) => {
      this.employees = employees;
    });
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.id.currentValue !== 0) {
      this.leaveService
        .getLeave(changes.id.currentValue)
        .subscribe((lea) => {
          console.log(lea);

          this.setForm(lea);
        });
    }
  }

  onSave() {
    if (this.leaForm.valid) {
      const formData = this.leaForm.getRawValue();
      formData.approved = parseInt(formData.approved);
      if (this.id == 0) {
        this.onSaveLea.emit(formData);
      } else {
        formData.Id = this.id;
        this.onSaveLea.emit(formData);
      }
    } else {
      console.error("invalid state");
    }
  }

  setForm(lea: Leave) {
    console.log(lea);
    this.leave = lea;
    this.leaForm.get("employee_id").setValue(lea.EmployeeId);
    this.leaForm
      .get("leave_date")
      .setValue(new Date(lea.LeaveDate).toISOString().substring(0, 10));
    this.leaForm.get("reason").setValue(lea.Reason);
    this.leaForm.get("approved").setValue(lea.Approved ? "0" : "1");
    this.leaForm.get("leave_type").setValue(lea.LeaveType);
  }
}
