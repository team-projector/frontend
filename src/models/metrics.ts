import { field, model } from '../decorators/model';
import { faker, mocks } from '../utils/mocks';

@model({
  mocking: (metrics: IssuesMetrics) => {
    metrics.count = mocks.random(250, 400);
    metrics.openedCount = metrics.count - mocks.random(150, 200);
    metrics.openedEstimated = metrics.openedCount * mocks.time(3, 9);
    metrics.openedSpent = metrics.openedEstimated * mocks.percents(65, 85);
    metrics.closedSpent = metrics.openedSpent * mocks.percents(65, 85);

    metrics.payroll = (metrics.openedSpent + metrics.closedSpent) * mocks.random(10, 20);
    metrics.payrollClosed = metrics.payroll * mocks.percents(60, 75);
    metrics.payrollOpened = metrics.payroll - metrics.payrollClosed;

    const taxes = mocks.percents(10, 40);
    metrics.taxes = metrics.payroll * taxes;
    metrics.taxesClosed = metrics.payrollClosed * taxes;
    metrics.taxesOpened = metrics.payrollOpened * taxes;
  }
})
export class IssuesMetrics {

  @field()
  count: number;

  @field()
  openedCount: number;

  @field()
  openedSpent: number;

  @field()
  closedSpent: number;

  @field()
  openedEstimated: number;

  @field()
  payroll: number;

  @field()
  payrollClosed: number;

  @field()
  payrollOpened: number;

  @field()
  taxes: number;

  @field()
  taxesClosed: number;

  @field()
  taxesOpened: number;
}

@model({
  mocking: (metrics: MergeRequestsMetrics) => {
    metrics.count = mocks.random(250, 400);
    metrics.openedCount = metrics.count - mocks.random(150, 200);
    metrics.openedEstimated = metrics.openedCount * mocks.time(3, 9);
    metrics.openedSpent = metrics.openedEstimated * mocks.percents(65, 85);
    metrics.closedSpent = metrics.openedSpent * mocks.percents(65, 85);

    metrics.payroll = (metrics.openedSpent + metrics.closedSpent) * mocks.random(10, 20);
    metrics.payrollClosed = metrics.payroll * mocks.percents(60, 75);
    metrics.payrollOpened = metrics.payroll - metrics.payrollClosed;

    const taxes = mocks.percents(10, 40);
    metrics.taxes = metrics.payroll * taxes;
    metrics.taxesClosed = metrics.payrollClosed * taxes;
    metrics.taxesOpened = metrics.payrollOpened * taxes;
  }
})
export class MergeRequestsMetrics {

  @field({mock: () => faker.random.number({max: 100})})
  count: number;

  @field({mock: () => faker.random.number({max: 100})})
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
