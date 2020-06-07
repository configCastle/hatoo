import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditorModule } from './editor/editor.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataService } from './data-service/data.service';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { SetsService } from './sets-service/sets.service';
import { FilesService } from './files-service/files.service';
import { DashboardModule } from './dashboard/dashboard.module';
import { RESTDataService } from './rest-data-service/rest-data.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    EditorModule,
    DashboardModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    GraphQLModule,
    HttpClientModule
  ],
  providers: [
    DataService,
    RESTDataService,
    SetsService,
    FilesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
