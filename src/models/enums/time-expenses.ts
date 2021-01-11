export enum OwnerType {
  issue = 'issue',
  mergeRequest = 'merge_request'
}

export enum TimeExpenseType {
  opened = 'opened',
  closed = 'closed',
  all = 'all'
}

export enum TimeExpenseState {
  opened = 'OPENED',
  closed = 'CLOSED',
  all = 'ALL'
}

export enum SpentTimeSort {
  dateAsc = 'DATE_ASC',
  dateDesc = 'DATE_DESC',
  createdAtAsc = 'CREATED_AT_ASC',
  createdAtDesc = 'CREATED_AT_DESC'
}
