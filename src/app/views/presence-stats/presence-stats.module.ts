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


@NgModule({
  declarations: [
    PresenceStatsComponent,
    PresenceFormComponent,
    PresenceCardComponent,
    PresenceCardsComponent,
    MutedStackedbarComponent,
    PresenceTotalComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    PresenceStatsRoutingModule
  ],
  providers: [PresenceStatsApiService, PresenceFormService, PresenceStatsGlobalService, PresenceStatsCardsService]
})
export class PresenceStatsModule { }
