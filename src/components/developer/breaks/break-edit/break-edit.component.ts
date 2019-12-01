import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-break-edit',
  templateUrl: './break-edit.component.html',
  styleUrls: ['./break-edit.component.scss']
})
export class BreakEditComponent implements OnInit {

  form = this.builder.group({
    id: [null],
    type: [null, Validators.required],
    title: [null, Validators.required],
    startDate: [new Date(), Validators.required],
    dueDate: [new Date(), Validators.required],
    url: [null]
  });
  constructor(private builder: FormBuilder) { }

  ngOnInit() {
  }

}
