import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-table-column',
  template: ''
})
export class TableColumnComponent {

  @Input()
  title: string;

  @Input()
  sort: string;

}
