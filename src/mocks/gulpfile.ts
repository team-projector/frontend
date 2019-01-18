import {Gulpclass, Task} from 'gulpclass';
import {UserCredentials} from '../models/user-credentials';
import {MOCK_FIELD_METADATA_KEY, MOCK_OBJECT_METADATA_KEY, MockFieldDescription} from '../decorators/mock';
import {__FIELD_JSON_NAME_METADATA_KEY} from 'serialize-ts/dist/metadata/metadata.keys';
import * as change from 'change-case';
import * as fs from 'fs';

@Gulpclass()
export class Gulpfile {

  private getTypeName(instance: any) {
    const meta = Reflect.getMetadata(MOCK_OBJECT_METADATA_KEY, instance);
    return change.snake(meta.name);
  }

  private getObjectMock(instance: any) {
    const fields = Reflect.getMetadata(MOCK_FIELD_METADATA_KEY, instance);
    const mock = [];
    fields.forEach((f: MockFieldDescription) => {
      const name = Reflect.getMetadata(__FIELD_JSON_NAME_METADATA_KEY, instance, f.name) || f.name;
      mock.push([`"${name}"`, `"${f.value}"`].join(': '));
    });

    return ['{ ', mock.join(', '), ' }'].join('\n');
  }

  private read(type: { new(): any }) {
    const instance = new (type)();
    const name = this.getTypeName(instance);
    const mock = this.getObjectMock(instance);
    fs.writeFileSync(`objects/${name}.hbs`, mock);
  }

  @Task()
  mocks(cb: Function) {

    const types = [UserCredentials];
    types.forEach(type => this.read(type));
    return cb();

  }

}
