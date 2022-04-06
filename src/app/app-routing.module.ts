import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./views/home-page/home-page.module').then(m => m.HomePageModule) },
  { path: 'heatmap', loadChildren: () => import('./views/heatmap-page/heatmap-page.module').then(m => m.HeatmapPageModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
