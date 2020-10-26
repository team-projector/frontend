import { NgModule } from '@angular/core';
import { HasLabelPipe, LabelsPipe } from './issue';

@NgModule({
  declarations: [
    LabelsPipe,
    HasLabelPipe
  ],
  exports: [
    LabelsPipe,
    HasLabelPipe
  ]
})
export class IssuePipesModule {

}
