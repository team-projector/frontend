import { Pipe, PipeTransform } from '@angular/core';
import { Label, StandardLabel } from '../../models/label';

@Pipe({name: 'labels'})
export class LabelsPipe implements PipeTransform {
  transform(labels: Label[]): Label[] {
    return labels.filter(l => l.title !== StandardLabel.toDo
      && l.title !== StandardLabel.doing && l.title !== StandardLabel.done);
  }
}

@Pipe({name: 'hasLabel'})
export class HasLabelPipe implements PipeTransform {
  transform(labels: Label[], title: string): boolean {
    return labels.some(l => l.title === title);
  }
}
