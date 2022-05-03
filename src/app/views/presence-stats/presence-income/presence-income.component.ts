import { Component, OnInit, Input } from '@angular/core';
import { GroupedVerticalBarLayoutService } from 'src/app/d3/grouped-vertical-barchart/grouped-vertical-bar-layout.service';
import { SimpleChange } from '@angular/core';
import { PresenceStatsGlobalService } from '../presence-stats-global.service';
import { InlineCircleChartLayoutService } from 'src/app/d3/inline-cicle-chart/inline-circle-chart-layout.service';


@Component({
  selector: 'app-presence-income',
  templateUrl: './presence-income.component.html',
  styleUrls: ['./presence-income.component.scss']
})
export class PresenceIncomeComponent implements OnInit {
  @Input() data: any;

  public hour: Date | undefined = undefined;
  chartData: any;
  chartLayout: any = {};

  circlesData: any;
  circlesLayout: any = {};
  dictionary = this.presenceStatsGlobalService.dictionary;

  constructor(
    private groupedVerticalBarLayoutService: GroupedVerticalBarLayoutService,
    private presenceStatsGlobalService: PresenceStatsGlobalService,
    private inlineCircleChartLayoutService: InlineCircleChartLayoutService) { }


  // GROUPED BAR CHART
  /* VERTICAL GROUPED BAR*/

  getIncomeGroups(pois: any[]): any[] {
    let keys: Array<string> = Object.keys(pois[0].summary.income.groups).filter(key => key && key !== 'none' && key !== 'None');
    let children = keys.map((key: string) => {
      let category = {
        "category": this.dictionary && this.dictionary[key] ? this.dictionary[key] : key
      };
      pois.forEach((poi: any) => {
        category[poi.title] = poi.summary.income.groups[key];
      });
      return category;
    })
    return children;
  }

  getBarChartData(pois: any[]): {} {
    let result = {
      key: 'income',
      format: 'Volumen',
      categories: 'Ingresos',
      children: this.getIncomeGroups(pois)
    };
    return result;
  }

  getTheColors(pois: any[]): string[] {
    return pois.map(poi => poi.color)
  }

  /* CIRCLES*/

  getCirclesSum(group, keys) {
    let sum = 0;
    keys.forEach((key: string) => {
      sum += group[key];
    });
    return {
      sum: sum,
      percent: null
    }
  }
  getSumGroups(pois: any[]): any[] {
    let incomeGroups = this.getIncomeGroups(pois);
    let xKeys = Object.keys(incomeGroups[0]);
    xKeys.shift();

    let sum = incomeGroups.map((group: any) => {
      let datum = {
        category: group.category,
        value: this.getCirclesSum(group, xKeys)
      };
      return datum;

    });
    return sum;
  }

  getIncomePercent(groups: any[]): any[] {
    let total = 0;
    let result = [];

    groups.forEach((group: string) => {
      total += group['value'].sum;
    });

    result = groups.map((group: any) => {
      group.value.percent = group.value.sum * 100 / total;
      return group;
    });

    return result;

  }

  getIncomeCircles(pois: any[]): any[] {
    let sumGroups = this.getSumGroups(pois);
    let percent = this.getIncomePercent(sumGroups);
    return percent;
  }

  getCirclesChartData(pois: any[]) {
    let result = {
      key: 'income',
      format: 'percent',
      categories: 'Ingresos',
      children: this.getIncomeCircles(pois)
    };
    return result;
  }

  setTheBarChart() {
    //  grouped Bar chart
    this.chartData = this.getBarChartData(this.data);
    this.chartLayout = this.groupedVerticalBarLayoutService.getLayout('presence_income')[0];
    this.chartLayout.design.style.colors = this.getTheColors(this.data);
    this.chartLayout['data'] = this.chartData;

  }
  setTheCirclesChart() {
    //  circles chart
    this.circlesData = this.getCirclesChartData(this.data);
    this.circlesLayout = this.inlineCircleChartLayoutService.getLayout('income_circles')[0];
    this.circlesLayout['data'] = this.circlesData;

  }

  setTheChart() {

    this.setTheBarChart();
    this.setTheCirclesChart();
    this.hour = new Date();
  }


  ngOnInit(): void {
    //this.setTheChart();
  }
  ngOnChanges(changes: { [propName: string]: SimpleChange }) {
    this.setTheChart();

  };


}
