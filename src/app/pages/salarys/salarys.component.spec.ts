/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SalarysComponent } from './salarys.component';

describe('SalarysComponent', () => {
  let component: SalarysComponent;
  let fixture: ComponentFixture<SalarysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalarysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalarysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
