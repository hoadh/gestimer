import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { TimerComponent } from './pages/timer/timer.component';
import { TimeformatPipe } from './pipes/timeformat.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TimerComponent,
    TimeformatPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
