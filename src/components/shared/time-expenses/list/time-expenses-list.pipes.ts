import { Pipe, PipeTransform } from '@angular/core';
import { OwnerType } from '../../../../models/enums/time-expenses';
import { Issue } from '../../../../models/issue';
import { MergeRequest } from '../../../../models/merge-request';

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
