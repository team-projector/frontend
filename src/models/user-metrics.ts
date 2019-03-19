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
  @MockFieldNested('{{int}}')
  issuesOpenedCount: number;

  @Field()
  @Name('payroll_closed')
  @MockFieldNested('{{int}}')
  payrollClosed: number;

  @Field()
  @Name('payroll_opened')
  @MockFieldNested('{{int}}')
  payrollOpened: number;

}

