import { HolidayService } from "src/app/services/holiday/holiday.service";
import { Holiday } from "src/app/model/holiday";
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
declare var $: any;
@Component({
  selector: 'app-modal-holiday',
  templateUrl: './modal-holiday.component.html',
  styleUrls: ['./modal-holiday.component.css']
})
export class ModalHolidayComponent implements OnInit, OnChanges {

  @Input() id: number = 0;
  @Output() onSaveHol = new EventEmitter();
  holiday: Holiday;
  holForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private holidayService: HolidayService,
  ) {
    this.holForm = fb.group({});
  }

  ngOnInit() {
    this.holForm = this.fb.group({
      holidaydate: ["", Validators.required],
      description: ["", Validators.required],
      dayoff: ["", Validators.required],
    });
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.id.currentValue !== 0) {
      this.holidayService
        .getHoliday(changes.id.currentValue)
        .subscribe((hol) => {
          console.log(hol);

          this.setForm(hol);
        });
    }
  }
  onSave() {
    if (this.holForm.valid) {
      const formData = this.holForm.getRawValue();

      if (this.id == 0) {
        this.onSaveHol.emit(formData);
      } else {
        formData.Id = this.id;
        this.onSaveHol.emit(formData);
      }
    } else {
      console.error("invalid state");
    }
  }
  setForm(hol: Holiday) {
    console.log(hol);
    this.holiday = hol;
    this.holForm.get("holidaydate").setValue(hol.HolidayDate);
    this.holForm.get("description").setValue(hol.Description);
    this.holForm.get("dayoff").setValue(hol.DayOff);
  }
}
