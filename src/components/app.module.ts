import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {Config, HttpMockService, HttpService} from 'junte-angular';
import {AppConfig} from '../app-config';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {MeServiceProvider} from '../services/me/provider';
import {MeManager} from '../managers/me.manager';
import {registerLocaleData} from '@angular/common';
import localeDe from '@angular/common/locales/de';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {GraphQLServiceProvider} from '../services/graphql/provider';

registerLocaleData(localeDe);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: Config,
      useClass: AppConfig,
    },
    {provide: LOCALE_ID, useValue: 'ru'},
    HttpClient,
    HttpService,
    HttpMockService,
    GraphQLServiceProvider,

    MeServiceProvider,
    MeManager
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
