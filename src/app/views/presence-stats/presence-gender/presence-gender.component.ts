import { Component, OnInit, Input } from '@angular/core';
import { SimpleChange } from '@angular/core';

@Component({
  selector: 'app-presence-gender',
  templateUrl: './presence-gender.component.html',
  styleUrls: ['./presence-gender.component.scss']
})
export class PresenceGenderComponent implements OnInit {
  @Input() data: any;
  genders = [{ name: 'male', color: '#9c0943' }, { name: 'female', color: '#5e52a0' }];
  gender: any = undefined;


  getGender(pois: any) {
    let sum = {
      male: 0,
      female: 0,
      total: 0
    }

    let partial = this.genders.map((gender: any, index: number) => {
      pois.forEach((poi) => {
        sum[gender.name] += poi.summary.gender.groups[gender.name];
      })
      sum.total += sum[gender.name];

      return {
        value: sum[gender.name],
        id: 'block_' + index,
        name: gender.name,
        title: gender.name,
        color: gender.color,
        isImportant: false,
        height: '16px',
        width: null,
        border: '1px solid white'
      }
    });
    let final = partial.map((part: any) => {
      part.width = sum[part.name] * 100 / sum.total;
      return part;

    })
    return final;
  }

  constructor() { }

  ngOnInit(): void {
    this.gender = this.getGender(this.data);
  }

  ngOnChanges(changes: { [propName: string]: SimpleChange }) {
    //console.log('changes', changes, this.svg, this.chartSelected, this.key, this.margin);
    let changeObj = Object.keys(changes);
    this.gender = this.getGender(this.data);

  };

}
