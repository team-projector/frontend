import { field, model } from '../decorators/model';
import { faker, mocks } from '../utils/mocks';

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

  @field({mock: () => faker.random.number()})
  payroll: number;

  @field({mock: () => faker.random.number()})
  payrollClosed: number;

  @field({mock: () => faker.random.number()})
  payrollOpened: number;

  @field({mock: () => faker.random.number()})
  taxes: number;

  @field({mock: () => faker.random.number()})
  taxesClosed: number;

  @field({mock: () => faker.random.number()})
  taxesOpened: number;
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

  @field({mock: () => faker.random.number()})
  payroll: number;

  @field({mock: () => faker.random.number()})
  payrollClosed: number;

  @field({mock: () => faker.random.number()})
  payrollOpened: number;

  @field({mock: () => faker.random.number()})
  taxes: number;

  @field({mock: () => faker.random.number()})
  taxesClosed: number;

  @field({mock: () => faker.random.number()})
  taxesOpened: number;
}
