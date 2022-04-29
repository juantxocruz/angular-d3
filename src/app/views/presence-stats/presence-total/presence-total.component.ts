import { Component, OnInit, Input } from '@angular/core';
import { SimpleChange } from '@angular/core';


@Component({
  selector: 'app-presence-total',
  templateUrl: './presence-total.component.html',
  styleUrls: ['./presence-total.component.scss']
})
export class PresenceTotalComponent implements OnInit {
  @Input() data: any;
  presence: any = undefined;


  getPresence(pois: any) {

    let result = pois.map((poi: any, index: number) => {
      let r = {
        value: poi.summary.presence.total,
        id: 'block_' + index,
        title: poi.address,
        color: poi.color,
        isImportant: false,
        height: '16px',
        width: poi.summary.presence.percent,
        border: '1px solid white'
      };
      return r;

    })

    return result;

  }


  constructor() { }

  ngOnInit(): void {
    this.presence = this.getPresence(this.data);
  }

  ngAfterViewInit() { return false; }

  ngOnChanges(changes: { [propName: string]: SimpleChange }) {
    //console.log('changes', changes, this.svg, this.chartSelected, this.key, this.margin);
    let changeObj = Object.keys(changes);
    this.presence = this.getPresence(this.data);

  };

}
