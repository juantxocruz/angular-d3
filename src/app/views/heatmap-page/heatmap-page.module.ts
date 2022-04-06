import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { HeatmapPageRoutingModule } from './heatmap-page-routing.module';

import { HeatmapPageComponent } from './heatmap-page.component';
import { HeatmapComponent } from '../../d3/heatmap/heatmap.component';
import { HeatmapLayoutService } from '../../d3/heatmap/heatmap-layout.service';
import { ColorsService } from '../../d3/services/colors.service';
import { DefaultVarsService } from '../../d3/services/default-vars.service';
import { TooltipStyleService } from '../../d3/services/tooltipStyle.service';
import { DimensionsService } from 'src/app/d3/services/dimensiones.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HeatmapPageComponent,
    HeatmapComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    HeatmapPageRoutingModule,
    FormsModule

  ],
  exports: [],
  providers: [HeatmapLayoutService, DimensionsService, ColorsService, DefaultVarsService, TooltipStyleService]

})
export class HeatmapPageModule { }
