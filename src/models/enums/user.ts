export enum UserPermission {
  inviteUser = 'invite_user',
}

export enum UserRole {
  developer = 'DEVELOPER',
  leader = 'TEAM_LEADER',
  manager = 'MANAGER',
  customer = 'CUSTOMER',
  shareholder = 'SHAREHOLDER'
}

export enum UserProblem {
  payrollOpenedOverflow = 'PAYROLL_OPENED_OVERFLOW'
}

export enum UserSort {
  loginAsc = 'LOGIN_ASC',
  loginDesc = 'LOGIN_DESC',
  nameAsc = 'NAME_ASC',
  nameDesc = 'NAME_DESC'
}
