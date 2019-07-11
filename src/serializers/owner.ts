import {deserialize, Serializer} from 'serialize-ts';
import {Issue} from '../models/issue';
import {MergeRequest} from '../models/merge-request';

export class OwnerSerializer implements Serializer<Issue | MergeRequest> {
  serialize(source: Issue | MergeRequest): string {
    throw new Error('Was not implemented');
  }

  deserialize(source: Object): Issue | MergeRequest {
    switch (source['__type__']) {
      case 'merge_request':
        return deserialize(source, MergeRequest);
      case 'issue':
      default:
        return deserialize(source, Issue);
    }
  }
}
