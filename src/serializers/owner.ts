import {deserialize, Serializer} from 'serialize-ts';
import {Issue} from '../models/graphql/issue';
import {MergeRequest} from '../models/graphql/merge-request';

export class OwnerSerializer implements Serializer<Issue | MergeRequest> {
  serialize(source: Issue | MergeRequest): string {
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
