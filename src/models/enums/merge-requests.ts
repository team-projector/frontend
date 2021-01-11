export enum MergeRequestState {
  opened = 'OPENED',
  merged = 'MERGED',
  closed = 'CLOSED'
}

export enum MergeRequestType {
  all = 'all',
  closed = 'closed',
  opened = 'opened',
  merged = 'merged'
}

export enum MergeRequestSort {
  titleAsc = 'TITLE_ASC',
  titleDesc = 'TITLE_DESC',
  createdAtAsc = 'CREATED_AT_ASC',
  createdAtDesc = 'CREATED_AT_DESC',
  closedAtAsc = 'CLOSED_AT_ASC',
  closedAtDesc = 'CLOSED_AT_DESC'
}
