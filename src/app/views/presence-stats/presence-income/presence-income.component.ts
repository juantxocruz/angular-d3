import { Component, OnInit, Input } from '@angular/core';
import { GroupedVerticalBarLayoutService } from 'src/app/d3/services/grouped-vertical-bar-layout.service';
import { SimpleChange } from '@angular/core';


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

  constructor(private groupedVerticalBarLayoutService: GroupedVerticalBarLayoutService) { }


  getIncomeChildren(pois: any[]): any[] {
    let keys: Array<string> = Object.keys(pois[0].summary.income.groups).filter(key => key && key !== 'none' && key !== 'None');
    let children = keys.map((key: string) => {
      let category = {
        "category": key
      };
      pois.forEach((poi: any) => {
        category[poi.title] = poi.summary.income.groups[key];
      });
      return category;
    })
    return children;
  }

  getChartData(pois: any[]): {} {
    let result = {
      key: 'income',
      format: 'val',
      categories: 'Ingresos',
      children: this.getIncomeChildren(pois)
    };
    return result;
  }

  getTheColors(pois: any[]): string[] {
    return pois.map(poi => poi.color)
  }

  setTheChart() {
    this.hour = new Date();
    // we are here
    this.chartData = this.getChartData(this.data);
    this.chartLayout = this.groupedVerticalBarLayoutService.getLayout('presence_income')[0];
    this.chartLayout.design.style.colors = this.getTheColors(this.data);
    this.chartLayout['data'] = this.chartData;

  }


  ngOnInit(): void {
    //this.setTheChart();
  }
  ngOnChanges(changes: { [propName: string]: SimpleChange }) {
    this.setTheChart();

  };


}
