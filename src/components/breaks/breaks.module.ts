import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { JunteUiModule } from 'junte-ui';
import { BreaksComponent} from 'src/components/breaks/breaks/breaks.component';
import { BreakEditComponent } from 'src/components/breaks/break-edit/break-edit.component';


@NgModule({
  declarations: [
    BreaksComponent,
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
    BreaksComponent
  ]
})
export class BreaksModule {

}
