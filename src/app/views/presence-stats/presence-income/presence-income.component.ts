import { Component, OnInit, Input } from '@angular/core';
import { GroupedVerticalBarLayoutService } from 'src/app/d3/services/grouped-vertical-bar-layout.service';

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

  getChartData(brickGroup, areaGroup, list) {
    let result = {
      key: list.key,
      format: list.formato,
      categories: 'Áreas',
      children: [
        { category: 'brick', [list.key]: brickGroup[list.key] },
        { category: 'area', [list.key]: areaGroup[list.key] }
      ]

    };
    return result;
  }

  ngOnInit(): void {
    this.hour = new Date();
    // we are here
    // this.chartData = this.getChartData(this.data);
    this.chartLayout = this.groupedVerticalBarLayoutService.getLayout('indicators_bars')[0];
    this.chartLayout['data'] = this.chartData;
  }

}
