import { Component, OnInit } from '@angular/core';
declare var $: any; 
@Component({
  selector: 'app-modal-employee',
  templateUrl: './modal-employee.component.html',
  styleUrls: ['./modal-employee.component.scss']
})
export class ModalEmployeeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  onSave(){
    $("#exampleModal").modal("hide");
  }
}
