import {Config, HttpMockService, HttpService} from 'junte-angular';
import {UsersMockService} from './service.mock';
import {UsersService} from './service';
import {users_service} from './interface';
import {AppConfig} from '../../app-config';

export function UsersServiceFactory(httpService: HttpService,
                                    httpMockService: HttpMockService,
                                    config: AppConfig) {
  return config.useMocks ?
    new UsersMockService(httpMockService) :
    new UsersService(httpService);
}

export const UsersServiceProvider = {
  provide: users_service,
  useFactory: UsersServiceFactory,
  deps: [HttpService, HttpMockService, Config]
};
