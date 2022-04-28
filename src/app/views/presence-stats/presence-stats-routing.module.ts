import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PresenceStatsComponent } from './presence-stats.component';

const routes: Routes = [{ path: '', component: PresenceStatsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PresenceStatsRoutingModule { }
