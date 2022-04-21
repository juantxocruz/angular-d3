import { Component, OnInit } from '@angular/core';
import { PopularTimesApiService } from './popular-times-api.service' // global data
import { PopularTimesReshapeService } from './popular-times-reshape.service'; // dots for map
import { PopularTimesFormService } from './popular-times-form/popular-times-form.service'; // form


@Component({
  selector: 'app-popular-times',
  templateUrl: './popular-times.component.html',
  styleUrls: ['./popular-times.component.scss']
})
export class PopularTimesComponent implements OnInit {
  eightDaysData$ = this.popularTimesApiService.eightDaysData$;
  heatMapData$ = this.popularTimesReshapeService.heatMapData$;
  eightDaysData: any;
  eightDaysForm: any;


  constructor(
    private popularTimesApiService: PopularTimesApiService,
    private popularTimesReshapeService: PopularTimesReshapeService,
    private popularTimesFormService: PopularTimesFormService) { }

  ngOnInit(): void {
    this.popularTimesApiService.getPopularTimesData().subscribe((data) => {
      let poisData = this.popularTimesReshapeService.getGoogleDataPois(data);
      this.eightDaysData = this.popularTimesReshapeService.getEightDaysData(poisData); // 7 days, 24 hours data + all week data sum
      this.eightDaysData$.next(this.eightDaysData); // seven days, 24 hours
      this.heatMapData$.next(this.eightDaysData[1]); // Monday, 24 hours

    });

    //fires ngOnChanges on timeline component
    this.popularTimesFormService.getForm().subscribe(f => {
      this.eightDaysForm = f;
      // map data for days (hours)
      if (this.eightDaysData && this.eightDaysForm) {
        this.popularTimesReshapeService.reshapeHeatMapData(this.eightDaysData, this.eightDaysForm);
      }

    });

  }

}



