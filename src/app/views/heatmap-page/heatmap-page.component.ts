import { Component, OnInit, SimpleChange } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { HeatmapLayoutService } from '../../d3/heatmap/heatmap-layout.service';
import { HeatmapPageService, weekDot, weekPoi } from './heatmap-page-service';



@Component({
  selector: 'app-heatmap-page',
  templateUrl: './heatmap-page.component.html',
  styleUrls: ['./heatmap-page.component.scss']
})
export class HeatmapPageComponent implements OnInit {

  popularTimesWeek$ = this.heatmapPageService.popularTimesWeek$; // all pois weekly data
  popularTimesPoi: weekPoi[]; // only one poi with id and values
  popularTimesDot$ = this.heatmapPageService.popularTimesDot$; // final exclusive poi for heatmap chart
  popularPoisOptions: Array<number>; // options for the mat select
  selectedItem: any; // selected poi id in mat select model

  heatmapLayout: {} = {};
  hour: Date = new Date();
  constructor(
    private httpClient: HttpClient,
    private heatmapLayoutService: HeatmapLayoutService,
    private heatmapPageService: HeatmapPageService) { }


  filterPopularPoisOptions(data: Array<weekPoi>) {
    let result: Array<number> = [];
    data.forEach((d: any) => {
      if (result.indexOf(d.id) < 0) { result.push(d.id) }
    });
    return result;
  }

  filterPopularTimesPoi(poi: number): weekPoi[] {
    let result = this.popularTimesWeek$.value.filter((d: any) => {
      return d.id === poi
    });
    return result;
  }


  // here we convert hours array to a number: the index, 0 --> 6AM
  getPoiHour(hour: Array<any>) {
    return hour[0];
  }

  // here we convert English Days array to Spanish Day number: the index, 0 --> Monday (in English 0 is Sunday, take note of that)
  getPoiDay(day: Array<any>) {
    return day[0] > 0 ? day[0] - 1 : 6; // now, 0 is Monday and 6 is Sunday
  }


  getPopularTimesDots(pois: weekPoi[]): weekDot[] {

    let result: Array<weekDot> = pois.map((poi: any) => {

      poi.values.y = this.getPoiHour(poi.values.y);
      poi.values.x = this.getPoiDay(poi.values.x);
      return poi.values

    });
    return result;

  }

  setPopulartTimesDot(id: number) {
    this.popularTimesPoi = this.filterPopularTimesPoi(id);
    this.popularTimesDot$.next(this.getPopularTimesDots(this.popularTimesPoi));
  }

  changePopularTimesPoi(e: any) {
    this.selectedItem = e.value;
    this.setPopulartTimesDot(e.value);
  }

  ngOnInit(): void {
    this.heatmapLayout = this.heatmapLayoutService.getLayout('popular_times_heatmap');
    this.heatmapPageService.getPopularTimesApi().subscribe((d) => {
      this.popularPoisOptions = this.filterPopularPoisOptions(d);
      this.popularTimesWeek$.next(d);
      this.selectedItem = this.popularPoisOptions[0];
      this.setPopulartTimesDot(this.selectedItem);
    });
  }

  ngOnChanges(changes: { [propName: string]: SimpleChange }) {
    let changeObj = Object.keys(changes);
    this.hour = new Date();
    let y;
  }


}
