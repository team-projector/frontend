import { Config, HttpMockService, HttpService } from 'junte-angular';
import { GitlabMockService } from './service.mock';
import { GitlabService } from './service';
import { gitlab_service } from './interface';
import { AppConfig } from '../../app-config';

export function GitlabServiceFactory(httpService: HttpService,
                                     httpMockService: HttpMockService,
                                     config: AppConfig) {
  return config.useMocks ?
    new GitlabMockService(httpMockService) :
    new GitlabService(httpService);
}

export const GitlabServiceProvider = {
  provide: gitlab_service,
  useFactory: GitlabServiceFactory,
  deps: [HttpService, HttpMockService, Config]
};
