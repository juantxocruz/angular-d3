import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./views/home-page/home-page.module').then(m => m.HomePageModule) },
  { path: 'heatmap', loadChildren: () => import('./views/heatmap-page/heatmap-page.module').then(m => m.HeatmapPageModule) },
  { path: 'popular-times', loadChildren: () => import('./views/popular-times/popular-times.module').then(m => m.PopularTimesModule) },
  { path: 'presence-stats', loadChildren: () => import('./views/presence-stats/presence-stats.module').then(m => m.PresenceStatsModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
