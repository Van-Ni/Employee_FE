import { SalaryService } from "src/app/services/salary/salary.service";
import { Salary } from "src/app/model/salary";
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
declare var $: any;
@Component({
  selector: 'app-modal-salary',
  templateUrl: './modal-salary.component.html',
  styleUrls: ['./modal-salary.component.css']
})
export class ModalSalaryComponent implements OnInit, OnChanges {
  @Input() id: number = 0;
  @Output() onSaveSal = new EventEmitter();
  salary: Salary;
  salForm: FormGroup;
  employees: Employee[];
  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private salaryService: SalaryService,
  ) {
    this.salForm = fb.group({});
   }

  ngOnInit() {
    this.getEmployees();
    this.salForm = this.fb.group({
      employee_id: ["", Validators.required],
      basicSalary: ["", Validators.required],
      allowance: ["", Validators.required],
      coefficient: ["", Validators.required],
      hourlyRate: ["", Validators.required],
    });
  }
  getEmployees(): void {
    this.employeeService.getEmployees().subscribe((employees) => {
      this.employees = employees;
    });
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.id.currentValue !== 0) {
      this.salaryService
        .getSalary(changes.id.currentValue)
        .subscribe((sal) => {
          console.log(sal);

          this.setForm(sal);
        });
    }
  }
  onSave() {
    if (this.salForm.valid) {
      const formData = this.salForm.getRawValue();

      if (this.id == 0) {
        this.onSaveSal.emit(formData);
      } else {
        formData.Id = this.id;
        this.onSaveSal.emit(formData);
      }
    } else {
      console.error("invalid state");
    }
  }

  setForm(sal: Salary) {
    console.log(sal);
    this.salary = sal;
    this.salForm.get("employee_id").setValue(sal.EmployeeId);
    this.salForm.get("basicSalary").setValue(sal.BasicSalary);
    this.salForm.get("allowance").setValue(sal.Allowance);
    this.salForm.get("coefficient").setValue(sal.Coefficient);
    this.salForm.get("hourlyRate").setValue(sal.HourlyRate);
  }
}
