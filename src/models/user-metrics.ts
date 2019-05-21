import {Field, Model, Name, Type} from 'serialize-ts';
import {MockClass, MockFieldNested} from '../decorators/mock';


@Model()
@MockClass()
export class UserMetrics {

  @Field()
  @MockFieldNested('{{money}}')
  bonus: number;

  @Field()
  @MockFieldNested('{{money}}')
  penalty: number;

  @Field()
  @Name('issues_opened_count')
  @MockFieldNested('{{int 10 100}}')
  issuesOpenedCount: number;

  @Field()
  @Name('payroll_closed')
  @MockFieldNested('{{int 10 100}}')
  payrollClosed: number;

  @Field()
  @Name('payroll_opened')
  @MockFieldNested('{{int 1000 20000}}')
  payrollOpened: number;

  @Field()
  @Name('issues_closed_spent')
  @MockFieldNested('{{int 3600 18000}}')
  issuesClosedSpent: number;

  @Field()
  @Name('issues_opened_spent')
  @MockFieldNested('{{int 3600 18000}}')
  issuesOpenedSpent: number;

}

