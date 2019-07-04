import { deserialize, Serializer } from 'serialize-ts';
import { IssueCard } from '../models/issue';
import { MergeRequestCard } from '../models/merge_request';

export class OwnerSerializer implements Serializer<IssueCard | MergeRequestCard> {
  serialize(date: IssueCard | MergeRequestCard): string {
    throw new Error('Was not implemented');
  }

  deserialize(source: Object): IssueCard | MergeRequestCard {
    switch (source['__type__']) {
      case 'merge_request':
        return deserialize(source, MergeRequestCard);
      case 'issue':
      default:
        return deserialize(source, IssueCard);
    }
  }
}
