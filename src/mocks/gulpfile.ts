import {Gulpclass, SequenceTask, Task} from 'gulpclass';
import {MOCK_FIELD_METADATA_KEY, MOCK_OBJECT_METADATA_KEY, MockFieldDescription, MockFieldNestedValue} from '../decorators/mock';
import {__FIELD_JSON_NAME_METADATA_KEY} from 'serialize-ts/dist/metadata/metadata.keys';
import * as change from 'change-case';
import * as fs from 'fs';
import {isArray} from 'util';
import * as gulp from 'gulp';
import * as debug from 'gulp-debug';
import * as map from 'map-stream';
import * as dummyjson from 'dummy-json';
import * as extname from 'gulp-extname';
import * as path from 'path';
import {isConstructor} from 'serialize-ts';

class NotFoundError {

}

@Gulpclass()
export class Gulpfile {

  store = {partials: {}, helpers: {}};

  private getTypeName(instance: any) {
    const meta = Reflect.getMetadata(MOCK_OBJECT_METADATA_KEY, instance);
    if (!meta) {
      throw new NotFoundError;
    }
    return change.snake(meta.name);
  }

  private getObjectMock(instance: any) {
    const fields = Reflect.getMetadata(MOCK_FIELD_METADATA_KEY, instance);
    if (!fields) {
      throw new NotFoundError;
    }

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

  private formatJSON(source: string) {
    return JSON.stringify(JSON.parse(source), null, 4);
  }

  @Task()
  mocks() {
    return gulp.src(['./../../dist/out-tsc/src/models/**/*.js'])
      .pipe(debug())
      .pipe(map((file, cb) => {
        const context = require(file.path);
        for (const key in context) {
          if (!context.hasOwnProperty(key)) {
            continue;
          }
          const type = context[key];
          if (isConstructor(type)) {
            console.log(key);
            try {
              this.write(type);
            } catch (e) {
              if ((e instanceof NotFoundError)) {
                console.log('meta not found');
              } else {
                throw e;
              }
            }
          }
        }
        return cb();
      }));
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
        const json = dummyjson.parse(file.contents.toString(), this.store);
        file.contents = new Buffer(this.formatJSON(json));
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
        const json = dummyjson.parse(file.contents.toString(), this.store);
        file.contents = new Buffer(this.formatJSON(json));
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
