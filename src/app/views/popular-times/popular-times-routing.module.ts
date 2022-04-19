import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PopularTimesComponent } from './popular-times.component';

const routes: Routes = [{ path: '', component: PopularTimesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PopularTimesRoutingModule { }
