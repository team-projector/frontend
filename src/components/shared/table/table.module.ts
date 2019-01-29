import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TableComponent} from './table.component';
import {TableColumnComponent} from './table-column.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    TableComponent,
    TableColumnComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    TableComponent,
    TableColumnComponent
  ]
})
export class TableModule {
}
