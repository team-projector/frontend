import { field, model } from '@junte/mocker-library';

@model()
export class LabelCard {

  @field({mock: '{{label}}'})
  title: string;

  @field({mock: '{{color}}'})
  color: string;

}
