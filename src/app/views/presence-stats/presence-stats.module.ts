import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PresenceStatsRoutingModule } from './presence-stats-routing.module';
import { PresenceStatsComponent } from './presence-stats.component';
import { PresenceStatsApiService } from './presence-stats-api.service';
import { PresenceFormComponent } from './presence-form/presence-form.component';
import { PresenceFormService } from './presence-form/presence-form.service';
import { PresenceStatsGlobalService } from './presence-stats-global.service';
import { PresenceCardComponent } from './presence-card/presence-card.component';
import { PresenceStatsCardsService } from './presence-card/presence-stats-cards.service';
import { PresenceCardsComponent } from './presence-cards/presence-cards.component';
import { MutedStackedbarComponent } from '../../html/muted-stackedbar/muted-stackedbar.component';
import { PresenceTotalComponent } from './presence-total/presence-total.component';
import { PresenceGenderComponent } from './presence-gender/presence-gender.component';
import { GroupedVerticalBarchartComponent } from 'src/app/d3/grouped-vertical-barchart/grouped-vertical-barchart.component';
import { DimensionsService } from "../../d3/services/dimensiones.service";
import { DefaultVarsService } from "../../d3/services/default-vars.service";
import { LocaleEsService } from "../../d3/services/locale-es.service";
import { AxisTitleService } from "../../d3/services/axis-title.service";
import { MeasureService } from "../../d3/services/measure.service";
import { ColorsService } from '../../d3/services/colors.service';
import { WordingService } from "../../d3/services/wording.service";
import { PresenceIncomeComponent } from './presence-income/presence-income.component';
import { GroupedVerticalBarLayoutService } from 'src/app/d3/services/grouped-vertical-bar-layout.service';
@NgModule({
  declarations: [
    PresenceStatsComponent,
    PresenceFormComponent,
    PresenceCardComponent,
    PresenceCardsComponent,
    MutedStackedbarComponent,
    PresenceTotalComponent,
    PresenceGenderComponent,
    GroupedVerticalBarchartComponent,
    PresenceIncomeComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    PresenceStatsRoutingModule
  ],
  providers: [
    PresenceStatsApiService,
    PresenceFormService,
    PresenceStatsGlobalService,
    PresenceStatsCardsService,
    DimensionsService,
    DefaultVarsService,
    LocaleEsService,
    AxisTitleService,
    MeasureService,
    ColorsService,
    WordingService,
    GroupedVerticalBarLayoutService


  ]
})
export class PresenceStatsModule { }
