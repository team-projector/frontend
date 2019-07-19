import {deserialize, Serializer} from 'serialize-ts';
import {Issue} from '../models/issue';
import {MergeRequest} from '../models/merge-request';

export class OwnerSerializer implements Serializer<Issue | MergeRequest> {
  serialize(issue: Issue | MergeRequest): string {
    throw new Error('Was not implemented');
  }

  deserialize(source: Object): Issue | MergeRequest {
    switch (source['__typename']) {
      case 'MergeRequest':
        return deserialize(source, MergeRequest);
      case 'Issue':
      default:
        return deserialize(source, Issue);
    }
  }
}
