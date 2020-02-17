import { faker } from '../utils/mocks';
import { ArraySerializer, ModelSerializer } from 'serialize-ts';
import { field, model } from '../decorators/model';
import { mocks } from '../utils/mocks';

@model()
export class IssuesMetrics {

  @field({mock: () => faker.random.number({max: 100})})
  count: number;

  @field({mock: () => faker.random.number()})
  openedCount: number;

  @field({mock: () => faker.random.number()})
  openedSpent: number;

  @field({mock: () => faker.random.number()})
  closedSpent: number;

  @field({mock: () => mocks.time(10, 50)})
  openedEstimated: number;
}

@model()
export class MergeRequestsMetrics {

  @field({mock: () => faker.random.number({max: 100})})
  count: number;

  @field({mock: () => faker.random.number()})
  openedCount: number;

  @field({mock: () => faker.random.number()})
  openedSpent: number;

  @field({mock: () => faker.random.number()})
  closedSpent: number;

  @field({mock: () => mocks.time(10, 50)})
  openedEstimated: number;
}
