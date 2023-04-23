import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Employee } from '../../../../model/employee';
import { EmployeeService } from '../../../../services/employee/employee.service';
declare var $: any;
@Component({
  selector: "app-modal-employee",
  templateUrl: "./modal-employee.component.html",
  styleUrls: ["./modal-employee.component.scss"],
})
export class ModalEmployeeComponent implements OnInit,OnChanges  {
  @Input() id: number = 0;
  @Output() onSaveEmp = new EventEmitter();
  employee: Employee;
  empForm: FormGroup;
  constructor(private fb: FormBuilder, private employeeService: EmployeeService) {
    this.empForm = fb.group({});
    
  }

  ngOnInit() {
    console.log(this.id);
    this.empForm = this.fb.group({
      fullname: ["", Validators.required],
      gender: [0, Validators.required],
      email: ["", Validators.required],
      phone: ["", Validators.required],
      address: ["", Validators.required],
      birthday: ["", Validators.required],
      joindate: ["", Validators.required],
      status: [0, Validators.required],
      department_id: [""],
      position_id: [""],
      contract_Id: [""],
    });
    
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.id.currentValue !== 0) {
      this.employeeService.getEmployee(changes.id.currentValue).subscribe((emp) => {
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
      if(this.id == 0){
        this.onSaveEmp.emit(formData);
      }else{
      formData.Id = this.id; 
        this.onSaveEmp.emit(formData);
      }
    } else {
      console.error("invalid state");
    }
  }
  
  setForm(emp: Employee) {
    console.log(emp.Fullname);
    this.empForm.get('fullname').setValue(emp.Fullname);
    this.empForm.get('gender').setValue(emp.Gender ? '1' : '0');
    this.empForm.get('email').setValue(emp.Email);
    this.empForm.get('phone').setValue(emp.Phone);
    this.empForm.get('address').setValue(emp.Address);
    this.empForm.get('birthday').setValue(emp.Birthday);
    this.empForm.get('joindate').setValue(emp.Joindate);
    this.empForm.get('status').setValue(emp.Status);
    this.empForm.get('department_id').setValue(emp.Department_id);
    this.empForm.get('position_id').setValue(emp.Position_id);
    this.empForm.get('contract_Id').setValue(emp.Contract_Id);
  }
  
}
