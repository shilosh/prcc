import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTooltipModule } from '@angular/material/tooltip'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './header/header.component';
import { MapComponent } from './map/map.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MunisComponent } from './munis/munis.component';
import { MuniComponent } from './muni/muni.component';
import { AboutComponent } from './about/about.component';
import { TreesComponent } from './trees/trees.component';
import { StatAreasComponent } from './stat-areas/stat-areas.component';
import { RegionComponent } from './region/region.component';
import { SummaryComponent } from './summary/summary.component';
import { ContentComponent } from './content/content.component';
import { FilterComponent } from './filter/filter.component';


@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    HeaderComponent,
    MapComponent,
    ContentComponent,
    MunisComponent,
    MuniComponent,
    FilterComponent,
    TreesComponent,
    StatAreasComponent,
    RegionComponent,
    SummaryComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTooltipModule,
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
