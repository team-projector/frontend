import { CurrencyPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DateFnsModule } from 'ngx-date-fns';
import { imports, providers } from 'src/consts';
import { MeManager } from '../managers/me.manager';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DateFnsModule.forRoot(),
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    ...imports
  ],
  providers: [
    MeManager,
    CurrencyPipe,
    ...providers
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

