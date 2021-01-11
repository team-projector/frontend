export enum TicketProblem {
  overDueDate = 'OVER_DUE_DATE',
  unassignedIssues = 'UNASSIGNED_ISSUES'
}

export enum TicketTypes {
  feature = 'FEATURE',
  improvement = 'IMPROVEMENT',
  bugFixing = 'BUG_FIXING'
}

export enum TicketStates {
  created = 'CREATED',
  planning = 'PLANNING',
  doing = 'DOING',
  testing = 'TESTING',
  accepting = 'ACCEPTING',
  done = 'DONE'
}

export enum TicketsTypes {
  all = 'all',
  created = 'created',
  planning = 'planning',
  doing = 'doing',
  testing = 'testing',
  accepting = 'accepting',
  done = 'done'
}

export enum TicketSort {
  dueDateAsc = 'DUE_DATE_ASC',
  dueDateDesc = 'DUE_DATE_DESC',
  startDateAsc = 'START_DATE_ASC',
  startDateDesc = 'START_DATE_DESC',
  titleAsc = 'TITLE_ASC',
  titleDesc = 'TITLE_DESC',
  stateAsc = 'STATE_ASC',
  stateDesc = 'STATE_DESC'
}
