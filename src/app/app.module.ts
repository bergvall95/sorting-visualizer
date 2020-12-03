import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NgbModule, NgbNav } from '@ng-bootstrap/ng-bootstrap';
import { SortingVisualizerComponent } from './sorting-visualizer/sorting-visualizer.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SortingVisualizerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
