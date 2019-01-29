import {serialize, Serializer} from 'serialize-ts';
import {SearchFilter} from '../components/shared/table/models';

export class SearchFilterSerializer implements Serializer<SearchFilter> {
  serialize(source: any): Object {
    const obj = serialize(source);
    delete obj['order'];
    delete obj['sort'];

    return obj;
  }

  deserialize(source: Object): SearchFilter {
    throw new Error('Not necessary for implementing');
  }
}
