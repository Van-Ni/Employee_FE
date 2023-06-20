/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EmpSalaryComponent } from './emp-salary.component';

describe('EmpSalaryComponent', () => {
  let component: EmpSalaryComponent;
  let fixture: ComponentFixture<EmpSalaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpSalaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpSalaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
