import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { PopularTimesRoutingModule } from './popular-times-routing.module';
import { PopularTimesComponent } from './popular-times.component';
import { PopularTimesFormComponent } from './popular-times-form/popular-times-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PopularTimesMapComponent } from './popular-times-map/popular-times-map.component';
import { PopularTimesMapService } from './popular-times-map/popular-times-map.service';
import { PopularTimesApiService } from './popular-times-api.service';
import { PopularTimesReshapeService } from './popular-times-reshape.service';
import { PopularTimesFormService } from './popular-times-form/popular-times-form.service';
import { PopularTimesTimelineComponent } from './popular-times-timeline/popular-times-timeline.component';

@NgModule({
  declarations: [
    PopularTimesComponent,
    PopularTimesFormComponent,
    PopularTimesMapComponent,
    PopularTimesTimelineComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    PopularTimesRoutingModule
  ],
  providers: [PopularTimesApiService, PopularTimesReshapeService, PopularTimesMapService, PopularTimesFormService]
})
export class PopularTimesModule { }
