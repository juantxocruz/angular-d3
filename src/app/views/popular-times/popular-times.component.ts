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
  sevenDaysData$ = this.popularTimesApiService.sevenDaysData$;
  heatMapData$ = this.popularTimesReshapeService.heatMapData$;
  poisData: any;
  sevenDaysData: any;
  weekDaysData: any;
  sevenDaysForm: any;


  constructor(
    private popularTimesApiService: PopularTimesApiService,
    private popularTimesReshapeService: PopularTimesReshapeService,
    private popularTimesFormService: PopularTimesFormService) { }

  ngOnInit(): void {
    this.popularTimesApiService.getPopularTimesData().subscribe((data) => {
      this.poisData = this.popularTimesReshapeService.getGoogleDataPois(data);
      this.sevenDaysData = this.popularTimesReshapeService.getSevenDaysData(this.poisData); // 7 days, 24 hours data + all week data sum
      this.sevenDaysData$.next(this.sevenDaysData); // seven days, 24 hours
      this.heatMapData$.next(this.sevenDaysData[1]); // Monday, 24 hours

    });

    //fires ngOnChanges on timeline component
    this.popularTimesFormService.getForm().subscribe(f => {
      this.sevenDaysForm = f;
      // map data for days (hours)
      this.popularTimesReshapeService.reshapeHeatMapData(this.sevenDaysData, this.sevenDaysForm);
    });

  }

}



