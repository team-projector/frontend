import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { JunteUiModule } from 'junte-ui';
import { BreaksComponent } from 'src/components/breaks/breaks.component';
import { ArrayPipesModule } from 'src/pipes/array-pipes.module';
import { DatePipesModule } from 'src/pipes/date-pipes.module';

@NgModule({
  declarations: [
    BreaksComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    DragDropModule,
    DatePipesModule,
    ArrayPipesModule,
    JunteUiModule
  ],
  exports: [
    BreaksComponent
  ]
})
export class BreaksModule {
}
