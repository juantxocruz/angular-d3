import { Component, ViewEncapsulation } from '@angular/core';
import * as L from 'leaflet';
import { FormControl, FormGroup } from '@angular/forms';
import { PopularTimesReshapeService } from '../popular-times-reshape.service';
import { PopularTimesFormService } from './popular-times-form.service';


function onClickVenueMarker(event) {
  console.log(event);
  return false;
}

@Component({
  selector: 'popular-times-form',
  templateUrl: './popular-times-form.component.html',
  styleUrls: ['./popular-times-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PopularTimesFormComponent {


  choices_days = this.popularTimesReshapeService.choices_days;
  choices_hours = this.popularTimesReshapeService.choices_hours;

  form: FormGroup;
  map: any;
  pois: any;
  filteredPois: any;
  venuemarkers: L.LayerGroup = new L.LayerGroup(); //new Array();

  dataTimeline: any = {
    day: 0,
    startHour: 0,
    endHour: 23,
    speed: 500
  };

  constructor(
    private popularTimesReshapeService: PopularTimesReshapeService,
    private popularTimesFormService: PopularTimesFormService
  ) {
    this.form = new FormGroup({
      day: new FormControl('0'),
      startHour: new FormControl('0'),
      endHour: new FormControl('23'),
      hidePois: new FormControl(true),
      rating: new FormControl(),
      review: new FormControl(),
      velocity: new FormControl('1000')
    })



    this.form.valueChanges.subscribe(() => {
      this.dataTimeline = {
        day: +this.form.controls.day.value,
        startHour: +this.form.controls.startHour.value,
        endHour: +this.form.controls.endHour.value,
        speed: +this.form.controls.velocity.value,
      }
      this.popularTimesFormService.setForm(this.dataTimeline);
    });

    this.form.controls.hidePois.valueChanges.subscribe(() => {

    })

  }


  getDDay = (day: string): Array<any> => {

    const result = this.choices_days.filter((d) => {
      return d[0] === Number(day);
    });
    return result.length > 0 ? result[0] : this.choices_days[0]; // [0, "Sunday"];

  }

  getNextDay = (day: any) => {

    const ix = Number(day) === 6 ? 0 : (Number(day) + 1);

    const result = this.choices_days.filter((d) => {
      return d[0] === ix;
    });
    return result.length > 0 ? result[0] : this.choices_days[this.choices_days.length - 1]; // [6, "Saturday"];

  }

  getMinHour = (hour: string) => {
    let result;
    if (hour) {
      result = this.choices_hours.filter((d) => {
        return d[2] === Number(hour);
      })[0];
    } else {
      result = this.choices_hours[0];// [0, "6AM", 6]
    }
    return result;

  }
  getMaxHour = (hour: string) => {
    let result;
    if (hour) {
      result = this.choices_hours.filter((d) => {
        return d[2] === Number(hour);
      })[0];
    } else {
      result = this.choices_hours[this.choices_hours.length - 1]; //   [23, "5AM", 5]
    }
    return result;

  }




  filterPois() {
    this.filteredPois = this.pois;
    if (this.form.controls.rating.value != undefined) {
      this.filteredPois.filter(poi => {
        return Math.round(+poi.properties.rating) == +this.form.controls.rating.value
      })
    }
  }



  onSubmit() {
    console.log(this.form)
  }
}
