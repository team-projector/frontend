import { field, model } from '@junte/mocker-library';

@model()
export class UserMetrics {

  @field({mock: '{{money}}'})
  bonus: number;

  @field({mock: '{{money}}'})
  penalty: number;

  @field({
    name: 'issues_opened_count',
    mock: '{{int 10 100}}'
  })
  issuesOpenedCount: number;

  @field({
    name: 'payroll_closed',
    mock: '{{int 10 100}}'
  })
  payrollClosed: number;

  @field({
    name: 'payroll_opened',
    mock: '{{int 1000 20000}}'
  })
  payrollOpened: number;

  @field({
    name: 'issues_closed_spent',
    mock: '{{int 3600 18000}}'
  })
  issuesClosedSpent: number;

  @field({
    name: 'issues_opened_spent',
    mock: '{{int 3600 18000}}'
  })
  issuesOpenedSpent: number;

}

