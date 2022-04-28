import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PresenceStatsApiService } from './presence-stats-api.service';
import { PresenceFormService } from './presence-form/presence-form.service';
import { PresenceStatsGlobalService } from './presence-stats-global.service';
import { PresenceStatsCardsService } from './presence-card/presence-stats-cards.service';
import { Card } from './presence-card/presence-stats-cards.service';


@Component({
  selector: 'app-presence-stats',
  templateUrl: './presence-stats.component.html',
  styleUrls: ['./presence-stats.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PresenceStatsComponent implements OnInit {

  presencePois$ = this.presenceStatsApiService.presencePois$; // Overall Raw Pois
  presencePois = undefined; // Only six raw pois with colors
  cards$ = this.presenceStatsCardsService.cards$; // Up to six cards

  colors: ["#2E86C1", "#E74C3C", "#F1C40F", "#2ECC71", "#7D3C98", "#E67E22"];




  gridColumns: 4;
  constructor(
    private presenceStatsApiService: PresenceStatsApiService,
    private presenceFormService: PresenceFormService,
    private presenceStatsCardsService: PresenceStatsCardsService,
    private presenceStatsGlobalService: PresenceStatsGlobalService) {
    // ge raw data
    this.presenceStatsApiService.getPresenceData().subscribe((data) => {
      // call to get the data
      return false;
    });
  }

  ngOnInit(): void {
    //fires ngOnChanges on components
    this.presenceFormService.getForm().subscribe(f => {
      if (f) {
        if (this.presencePois$.value && f.pois) {
          this.presencePois = this.presenceStatsGlobalService.reshapeSelectedPois(this.presencePois$.value, f.pois);
          if (this.presencePois) {
            // map data for days (hours)
            this.presenceStatsCardsService.changeCards(this.presencePois);
          }
        }
      }
    });
  }
}
