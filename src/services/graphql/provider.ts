import {Config, HttpMockService, HttpService} from 'junte-angular';
import {GraphQLMockService} from './service.mock';
import {GraphQLService} from './service';
import {graph_ql_service} from './interface';
import {AppConfig} from '../../app-config';

export function GraphQLServiceFactory(httpService: HttpService,
                                      httpMockService: HttpMockService,
                                      config: AppConfig) {
  return config.useMocks ?
    new GraphQLMockService(httpMockService) :
    new GraphQLService(httpService);
}

export const GraphQLServiceProvider = {
  provide: graph_ql_service,
  useFactory: GraphQLServiceFactory,
  deps: [HttpService, HttpMockService, Config]
};
