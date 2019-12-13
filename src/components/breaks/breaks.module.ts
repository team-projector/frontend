import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { JunteUiModule } from 'junte-ui';
import { BreaksListComponent} from 'src/components/breaks/breaks-list/breaks-list.component';
import { BreakEditComponent } from 'src/components/breaks/break-edit/break-edit.component';


@NgModule({
  declarations: [
    BreaksListComponent,
    BreakEditComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    JunteUiModule
  ],
  entryComponents: [
    BreakEditComponent
  ],
  exports: [
    BreaksListComponent
  ]
})
export class BreaksModule {

}
