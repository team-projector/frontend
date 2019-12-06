import { NgModule } from '@angular/core';
import { KeysPipe } from './keys';

@NgModule({
  declarations: [
    KeysPipe
  ],
  exports: [
    KeysPipe
  ]
})
export class KeysModule {
}
