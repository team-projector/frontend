import {Gulpclass, SequenceTask, Task} from 'gulpclass';
import {UserCredentials} from '../models/user-credentials';
import {MOCK_FIELD_METADATA_KEY, MOCK_OBJECT_METADATA_KEY, MockFieldDescription, MockFieldNestedValue} from '../decorators/mock';
import {__FIELD_JSON_NAME_METADATA_KEY} from 'serialize-ts/dist/metadata/metadata.keys';
import * as change from 'change-case';
import * as fs from 'fs';
import {Me} from '../models/me';
import {isArray} from 'util';
import {Issue, IssueCard} from '../models/issue';
import {Project} from '../models/project';
import * as gulp from 'gulp';
import * as debug from 'gulp-debug';
import * as map from 'map-stream';
import * as dummyjson from 'dummy-json';
import * as extname from 'gulp-extname';
import * as path from 'path';
import {ObjectLink} from '../models/object-link';
import {LabelCard} from '../models/label';

@Gulpclass()
export class Gulpfile {

  store = {partials: {}, helpers: {}};

  private getTypeName(instance: any) {
    const meta = Reflect.getMetadata(MOCK_OBJECT_METADATA_KEY, instance);
    return change.snake(meta.name);
  }

  private getObjectMock(instance: any) {
    const fields = Reflect.getMetadata(MOCK_FIELD_METADATA_KEY, instance);
    const mock = [];
    fields.forEach((f: MockFieldDescription) => {
      const name = Reflect.getMetadata(__FIELD_JSON_NAME_METADATA_KEY, instance, f.name) || f.name;
      let value = `"${f.value}"`;
      if (isArray(f.value)) {
        const arr = f.value.map(e => `"${e}"`);
        value = `[${arr.join(', ')}]`;
      } else if (f.value instanceof MockFieldNestedValue) {
        value = `${f.value.nested}`;
      }

      mock.push([`\t"${name}"`, value].join(': '));
    });

    return ['{', mock.join(', \n'), '}\n'].join('\n');
  }

  private write(type: { new(): any }) {
    const instance = new (type)();
    const name = this.getTypeName(instance);
    const mock = this.getObjectMock(instance);
    fs.writeFileSync(`objects/${name}.hbs`, mock);
  }

  @Task()
  mocks(cb: Function) {

    const types = [ObjectLink, UserCredentials, Me, Project, LabelCard, IssueCard, Issue];
    types.forEach(type => this.write(type));
    return cb();

  }

  @Task()
  helpers() {
    return gulp.src(['helpers/*.json'])
      .pipe(debug())
      .pipe(map((file, cb) => {
        const name = path.basename(file.path, '.json');
        this.store.helpers[name] = () => dummyjson.utils.randomArrayItem(JSON.parse(file.contents.toString()));
        return cb();
      }));
  }

  @Task()
  partials() {
    return gulp.src(['objects/*.hbs'])
      .pipe(debug())
      .pipe(map((file, cb) => {
        const name = path.basename(file.path, '.hbs');
        this.store.partials[name] = file.contents.toString();
        return cb(null, file);
      }));
  }

  @Task()
  objects() {
    return gulp.src(['objects/*.hbs'])
      .pipe(debug())
      .pipe(map((file, cb) => {
        file.contents = new Buffer(dummyjson.parse(file.contents.toString(), this.store));
        return cb(null, file);
      }))
      .pipe(extname('.json'))
      .pipe(gulp.dest('objects/'));
  }

  @Task()
  services() {
    return gulp.src(['services/**/*.hbs'])
      .pipe(debug())
      .pipe(map((file, cb) => {
        file.contents = new Buffer(dummyjson.parse(file.contents.toString(), this.store));
        return cb(null, file);
      }))
      .pipe(extname('.json'))
      .pipe(gulp.dest('../assets/mocks'));
  }

  @SequenceTask()
  build() {
    return ['mocks', 'helpers', 'partials', 'objects', 'services'];
  }

}
