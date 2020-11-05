import { addDays } from 'date-fns';
import * as fakerEn from 'faker/locale/en';
import * as fakerRu from 'faker/locale/ru';
import { MOCK_FIELDS_METADATA_KEY, MOCKING_METADATA_KEY } from '../decorators/model';
import { Language } from '../enums/language';
import { detectLanguage } from './lang';

const MAX_LEVELS = 4;
export const SECONDS_IN_MINUTE = 60;
export const SECONDS_IN_HOUR = 3600;

export const faker = ((): any => {
  switch (detectLanguage()) {
    case Language.ru:
      return fakerRu;
    case Language.en:
    default:
      return fakerEn;
  }
})();

class MaxLevelReached {

}

type Constructor<T> = new () => T;
type Activator<T> = () => Constructor<T>;

export function getMock<T>(model: Constructor<T> | Activator<T>,
                           context: Object = null, index: number = 0, level: number = 0): T {
  if (level > MAX_LEVELS) {
    throw new MaxLevelReached();
  }
  const next = level + 1;
  const obj = !!model.prototype ? new (model as Constructor<T>)() as T : new ((model as Activator<T>)())();
  const metadata = Reflect.getMetadata(MOCK_FIELDS_METADATA_KEY, obj);
  for (const property in metadata) {
    const type = Reflect.getMetadata('design:type', obj, property);
    if (!type) {
      continue;
    }
    const mock = metadata[property];
    if (type === Boolean || type === Number || type === String || type === Date) {
      if (!!mock) {
        if (typeof mock === 'function') {
          obj[property] = (mock as Function)(context, index, next);
        } else {
          obj[property] = mock;
        }
      }
    } else if (type === Array) {
      if (!!mock) {
        if ('type' in mock) {
          const conf = mock as { type: any, length: number };
          const list = [];
          for (let i = 0; i < conf.length; i++) {
            try {
              list.push(getMock(conf.type, context, i, next));
            } catch (e) {
              if (e instanceof MaxLevelReached) {
                return null;
              }
            }
          }
          obj[property] = list;
        } else {
          if (typeof mock === 'function') {
            obj[property] = (mock as Function)(context, index, next);
          } else {
            obj[property] = mock;
          }
        }
      }
    } else {
      if (!!mock) {
        try {
          obj[property] = getMock(mock, context, index, next);
        } catch (e) {
          if (e instanceof MaxLevelReached) {
            return null;
          }
        }
      }
    }
  }
  const mocking = Reflect.getMetadata(MOCKING_METADATA_KEY, obj);
  if (!!mocking) {
    mocking(obj, context, index);
  }

  return obj;
}

export enum TimeAccuracy {
  hours,
  minutes
}

export const mocks = {
  date: {
    interval: (): Date[] => {
      const from = faker.date.past();
      return [from, addDays(from, faker.random.number({min: 5, max: 20}))];
    }
  },
  time: (min: number = 0, max: number = 8, accuracy: TimeAccuracy = TimeAccuracy.hours) => {
    let time = faker.random.number({min: min, max: max}) * SECONDS_IN_HOUR;
    if (accuracy === TimeAccuracy.minutes) {
      time += faker.helpers.randomize([10, 20, 30, 40, 50]) * SECONDS_IN_MINUTE;
    }
    return time;
  },
  money: (min: number, max: number) => {
    return faker.random.number({min: min, max: max});
  },
  percents: (min: number = 1, max: number = 100) => {
    return faker.random.number({min: min, max: max}) / 100;
  },
  efficiency: (min: number = 10, max: number = 200) => {
    return faker.random.number({min: min, max: max}) / 100;
  },
  random: (min: number, max: number) => {
    return faker.random.number({min: min, max: max});
  },
  hourlyRate: (min: number = 15, max: number = 30) => {
    return faker.random.number({min: min, max: max});
  }
};
