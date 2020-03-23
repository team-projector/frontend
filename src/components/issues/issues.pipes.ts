import { Pipe, PipeTransform } from '@angular/core';
import { StandardLabel } from 'src/models/enums/standard-label';
import { Label } from 'src/models/label';
import { OwnerType } from '../../models/enums/time-expenses';
import { Issue } from '../../models/issue';
import { MergeRequest } from '../../models/merge-request';

@Pipe({name: 'labels'})
export class LabelsPipe implements PipeTransform {
  transform(labels: Label[]): Label[] {
    return labels.filter(l => l.title !== StandardLabel.toDo
      && l.title !== StandardLabel.doing
      && l.title !== StandardLabel.done
      && l.title !== StandardLabel.delayed
      && l.title !== StandardLabel.bug);
  }
}

@Pipe({name: 'hasLabel'})
export class HasLabelPipe implements PipeTransform {
  transform(labels: Label[], title: string): boolean {
    return labels.some(l => l.title === title);
  }
}

@Pipe({name: 'getOwnerType'})
export class GetOwnerTypePipe implements PipeTransform {
  transform(owner: Issue | MergeRequest): OwnerType {
    if (owner instanceof Issue) {
      return OwnerType.issue;
    } else if (owner instanceof MergeRequest) {
      return OwnerType.mergeRequest;
    }
    throw new Error('Wrong owner type');
  }
}

