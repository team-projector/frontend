import { field, model } from '@junte/mocker-library';

@model()
export class ObjectLink {

  @field({mock: '{{int 1 100}}'})
  id: number;

  @field({mock: '{{presentation}}'})
  presentation: string;

}
