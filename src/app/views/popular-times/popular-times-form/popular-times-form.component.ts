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
    timeline: 0,
    day: 0,
    days: null,
    startHour: 0,
    endHour: 23,
    speed: 500
  };

  constructor(
    private popularTimesReshapeService: PopularTimesReshapeService,
    private popularTimesFormService: PopularTimesFormService
  ) {
    this.form = new FormGroup({
      timeline: new FormControl('0'),
      day: new FormControl('1'), // by hours
      days: new FormControl(['1']), // by days, multiple selection
      startHour: new FormControl('0'),
      endHour: new FormControl('23'),
      hidePois: new FormControl(true),
      rating: new FormControl(),
      review: new FormControl(),
      velocity: new FormControl('1000')
    })



    this.form.valueChanges.subscribe((f) => {
      this.dataTimeline = {
        timeline: +f.timeline,
        day: +f.day,
        days: f.days,
        startHour: +f.startHour,
        endHour: +f.endHour,
        speed: +f.velocity,
      }
      this.popularTimesFormService.setForm(this.dataTimeline);

    });

    this.form.controls.timeline.valueChanges.subscribe((v) => {
      if (v === "1") { // by days, select day
        let val = this.form.controls.day.value === "7" ? "1" : this.form.controls.day.value;
        this.form.controls.days.setValue([val]);
        return false;
      }
      if (v === "0") { // by days, select day
        this.form.controls.day.setValue(this.form.controls.days.value[0]);
        return false;
      }
    });

    this.form.controls.days.valueChanges.subscribe((v) => {
      if (v.length < 2) {
        // the relationship between data array and the week day is on the form control day array.
        // zero is Sunday, but from now, it will be at last position of the data array
        this.form.controls.days.setValue(['1', '2', '3', '4', '5', '6', '0'], { emitEvent: false });
        return false;
      }

      let result = [];
      let start = +v[0];
      let end = +v[v.length - 1] === 0 ? 7 : +v[v.length - 1];
      let blanks = end - start;

      for (var i = 0; i <= blanks; i++) {
        if ((+v[0] + i) === 7) { result.push('0') }
        else {
          result.push((+v[0] + i).toString());
        };

      }

      this.form.controls.days.setValue(result, { emitEvent: false });
      return false;

    })

    this.form.controls.startHour.valueChanges.subscribe((s) => {
      return false;
    })
    this.form.controls.hidePois.valueChanges.subscribe(() => {
    })

  }

  onSubmit() {
    console.log(this.form)
  }
}
