import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {TimerComponent} from './pages/timer/timer.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'timer/:seconds', component: TimerComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
