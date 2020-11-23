import { addDays } from 'date-fns';
import * as fakerEn from 'faker/locale/en';
import * as fakerRu from 'faker/locale/ru';
import { Language } from '../enums/language';
import { detectLanguage } from './lang';

export enum TimeAccuracy {
  hours,
  minutes
}

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
  },
  id: () => {
    return faker.random.uuid();
  }

};
