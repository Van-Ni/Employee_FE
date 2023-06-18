import { RewarddisciplineService } from "src/app/services/rewarddiscipline/rewarddiscipline.service";
import { Rewarddiscipline } from "src/app/model/rewarddiscipline";
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
import { EmployeeService } from "src/app/services/employee/employee.service";
import { Employee } from "src/app/model/employee";
declare var $: any;
@Component({
  selector: 'app-modal-rewarddiscipline',
  templateUrl: './modal-rewarddiscipline.component.html',
  styleUrls: ['./modal-rewarddiscipline.component.css']
})
export class ModalRewarddisciplineComponent implements OnInit, OnChanges {
  @Input() id: number = 0;
  @Output() onSaveRew = new EventEmitter();
  rewarddiscipline: Rewarddiscipline;
  rewForm: FormGroup;
  employees: Employee[];
  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private rewarddisciplineService: RewarddisciplineService
  ) {
    this.rewForm = fb.group({});
   }

  ngOnInit() {
    this.getEmployees();
    this.rewForm = this.fb.group({
      employee_id: ["", Validators.required],
      transactiondate: ["", Validators.required],
      rewardamount: ["", Validators.required],
      reason: ["", Validators.required],
    });
  }
  getEmployees(): void {
    this.employeeService.getEmployees().subscribe((employees) => {
      this.employees = employees;
    });
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.id.currentValue !== 0) {
      this.rewarddisciplineService
        .getRewarddiscipline(changes.id.currentValue)
        .subscribe((rew) => {
          console.log(rew);

          this.setForm(rew);
        });
    }
  }
  onSave() {
    if (this.rewForm.valid) {
      const formData = this.rewForm.getRawValue();
      if (this.id == 0) {
        this.onSaveRew.emit(formData);
      } else {
        formData.Id = this.id;
        this.onSaveRew.emit(formData);
      }
    } else {
      console.error("invalid state");
    }
  }
  setForm(rew: Rewarddiscipline) {
    console.log(rew);
    this.rewarddiscipline = rew;
    this.rewForm.get("employee_id").setValue(rew.EmployeeId);
    this.rewForm.get("transactiondate").setValue(rew.TransactionDate);
    this.rewForm.get("rewardamount").setValue(rew.RewardAmount);
    this.rewForm.get("reason").setValue(rew.Reason);
  }
}
