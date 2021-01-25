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

export enum AssigneeType {
  assignedTo = 'assignedTo',
  createdBy = 'createdBy',
  participatedBy = 'participatedBy'
}

export enum IssueSort {
  dueDateAsc = 'DUE_DATE_ASC',
  dueDateDesc = 'DUE_DATE_DESC',
  titleAsc = 'TITLE_ASC',
  titleDesc = 'TITLE_DESC',
  createdAtAsc = 'CREATED_AT_ASC',
  createdAtDesc = 'CREATED_AT_DESC',
  closedAtAsc = 'CLOSED_AT_ASC',
  closedAtDesc = 'CLOSED_AT_DESC',
  userAsc = 'USER_ASC',
  userDesc = 'USER_DESC',
  stateAsc = 'STATE_ASC',
  stateDesc = 'STATE_DESC'
}
