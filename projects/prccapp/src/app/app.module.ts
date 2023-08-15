import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './header/header.component';
import { MapComponent } from './map/map.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MunisComponent } from './munis/munis.component';
import { AboutComponent } from './about/about.component';
import { TreesComponent } from './trees/trees.component';
import { StatAreasComponent } from './stat-areas/stat-areas.component';
import { SummaryComponent } from './summary/summary.component';
import { ContentComponent } from './content/content.component';


@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    HeaderComponent,
    MapComponent,
    ContentComponent,
    MunisComponent,
    TreesComponent,
    StatAreasComponent,
    SummaryComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
