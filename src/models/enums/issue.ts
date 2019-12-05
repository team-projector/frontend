export enum IssueState {
  opened = 'OPENED',
  closed = 'CLOSED'
}

export enum IssueProblem {
  overDueDate = 'OVER_DUE_DATE',
  emptyDueDate = 'EMPTY_DUE_DATE',
  emptyEstimate = 'EMPTY_ESTIMATE'
}

export enum IssuesType {
  all = 'all',
  closed = 'closed',
  opened = 'opened',
  problems = 'problems'
}
