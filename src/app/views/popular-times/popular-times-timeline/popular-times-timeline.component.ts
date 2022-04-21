import { Component, Input, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import HeatmapOverlay from 'leaflet-heatmap';
import * as L from 'leaflet';
import { PopularTimesReshapeService } from '../popular-times-reshape.service';
import { PopularTimesMapService } from '../popular-times-map/popular-times-map.service';


@Component({
  selector: 'app-popular-times-timeline',
  templateUrl: './popular-times-timeline.component.html',
  styleUrls: ['./popular-times-timeline.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PopularTimesTimelineComponent implements OnInit {


  @Input() heatMapData: any;
  @Input() form: any = {
    timeline: 0,  // hours or days
    days: null, // hours or days
    day: 0,
    startHour: 0,
    endHour: 23,
    speed: 500
  };

  choices_days = this.popularTimesReshapeService.choices_days;
  choices_hours = this.popularTimesReshapeService.choices_hours;

  heatmap_config: any = {
    // radius should be small ONLY if scaleRadius is true (or small radius is intended)
    radius: 32,
    maxOpacity: 0.6,// 0.6,
    minOpacity: 0.3,//0.4,
    blur: 1,
    // scales the radius based on map zoom
    scaleRadius: false,
    // backhround color for whole heatmap layer
    //backgroundColor: '#13ae4778',
    // custom gradient colors
    gradient: {
      // enter n keys between 0 and 1 here
      // for gradient color customization
      '0.0': 'green',
      0.5: 'orange',
      0.8: 'red'
    },
    // if set to false the heatmap uses the global maximum for colorization
    // if activated: uses the data maximum within the current map boundaries
    //   (there will always be a red spot with useLocalExtremas true)
    useLocalExtrema: false,
    // which field name in your data represents the latitude - default "lat"
    latField: 'lat',
    // which field name in your data represents the longitude - default "lng"
    lngField: 'lng',
    // which field name in your data represents the data value - default "value"
    valueField: 'count'
  };

  heatmapLayer: any;
  player: any;
  map: any;

  //player
  currentFrame = 0;
  heatmapData3: any;

  heatmap: any;
  data: any;
  interval: any;
  animationSpeed: number;
  wrapperEl: any;
  playButton: any;
  isPlaying: boolean;
  timeWindow: any;

  constructor(
    private popularTimesReshapeService: PopularTimesReshapeService,
    private popularTimesMapService: PopularTimesMapService,

  ) {

    this.popularTimesMapService.getMap().subscribe(map => {
      this.map = map;
    });


  }

  public setFrame(frame: number) {
    this.currentFrame = frame;
    const snapshot = this.data[frame];

    this.heatmapData3 = {
      max: 100,
      data: snapshot
    };
    //Set new data
    this.heatmapLayer.setData(this.heatmapData3);

    const timePoints = document.querySelectorAll('.heatmap-timeline .time-point');
    //remove all active points
    timePoints.forEach(point => {
      point.classList.remove('active');
      point.innerHTML = '';
    })

    // Hours
    if (+this.form.timeline === 0) {

      //Text of the first point
      timePoints[0].innerHTML =
        `<div style="margin-top:4px; color:#a7a7a7;font-size:11px">
            ${this.choices_hours[+this.form.startHour][1]}
      </div>`;

      //Text of the last point
      timePoints[this.data.length - 1].innerHTML =
        `<div style="margin-top:4px;color:#a7a7a7;font-size:11px">
            ${this.choices_hours[+this.form.endHour][1]}
      </div>`;

      timePoints[frame].classList.add('active');
      //Text of the pointer
      timePoints[frame].innerHTML =
        `<div style="margin-top:4px; color:#7367F0;font-size:11px">
            ${this.choices_hours[frame + +this.form.startHour][1]}
      </div>`;

    }
    if (+this.form.timeline === 1) {
      //Text of the first point
      timePoints[0].innerHTML =
        `<div style="margin-top:4px; color:#a7a7a7;font-size:11px">
            ${this.choices_days[+this.form.days[0]][1]}
      </div>`;

      //Text of the last point
      timePoints[this.data.length - 1].innerHTML =
        `<div style="margin-top:4px;color:#a7a7a7;font-size:11px">
              ${this.choices_days[+this.form.days[this.form.days.length - 1]][1]}
      </div>`;

      timePoints[frame].classList.add('active');
      //Text of the pointer
      timePoints[frame].innerHTML =
        `<div style="margin-top:4px; color:#7367F0;font-size:11px">
            ${this.choices_days[+this.form.days[0] + frame][1]}
      </div>`;



    }

  };

  public setAnimationSpeed(speed: number) {
    this.isPlaying = false;
    this.stop();
    this.animationSpeed = speed;
  }



  public setAnimationData(data: any) {
    this.isPlaying = false;
    this.stop();
    this.data = data;
    this.init();
  };



  public play() {
    // Only play when Live/ Now mode not enabled
    const dataLen = this.data.length;

    this.playButton.innerText = 'pause';
    this.interval = setInterval(() => {
      this.setFrame(++this.currentFrame % dataLen);
    }, +this.form.speed);

  };

  public stop() {
    clearInterval(this.interval);
    if (this.playButton) this.playButton.innerText = 'play';
  };



  init() {
    const dataLen = this.data.length;
    let frame;
    this.wrapperEl = document.querySelector('.timeline-wrapper');

    this.wrapperEl.innerHTML = '';

    this.playButton = this.playButton ? this.playButton : document.createElement('button');

    this.playButton.onclick = () => {
      if (this.isPlaying) {
        this.stop();
      } else {
        this.play();
      }
      this.isPlaying = !this.isPlaying;
    };
    this.playButton.innerText = 'play';

    this.wrapperEl.appendChild(this.playButton);

    const events = document.createElement('div');
    events.className = 'heatmap-timeline';
    events.innerHTML = '<div class="line"></div>';


    for (let i = 0; i < this.data.length; i++) {

      // Generate timeline points

      const xOffset = 100 / (dataLen - 1) * i;

      const ev = document.createElement('div');
      ev.className = 'time-point';
      ev.style.left = xOffset + '%';
      ev.onclick = (function (i: number) {
        return function () {
          this.isPlaying = false;
          this.stop();
          this.setFrame(i);
        }.bind(this);
      }.bind(this))(i);


      events.appendChild(ev);

    }
    this.wrapperEl.appendChild(events);

    // check if time_local_index is in user set hour_min/ max range.
    if (0 >= +this.form.startHour &&
      0 <= +this.form.endHour) {
      // local venue time is within hour_min/max range so setting the animation frame to venue current local hour.
      // The local hour index needs to be subtracted with the time window start index, since the local hour index is based
      // on an array from 0 to 23.
      frame = 0 - +this.form.startHour;
    } else {
      // local vanue time is outside range, so setting the frame to the hour_min value
      // The local hour index needs to be subtracted with the time window start index, since the local hour index is based
      // on an array from 0 to 23.

      frame = +this.form.startHour - +this.form.startHour;
    }

    this.setFrame(frame);


  };



  drawHeatMap(setView = true) {
    // data: Array<LatLngCount>
    // Data points defined as an array of LatLng objects
    // https://developers.google.com/maps/documentation/javascript/heatmaplayer?hl=nl


    this.data = this.heatMapData;


    if (this.data) {

      // Set map position and zoom
      if (setView == true) {
        // set view
        // to be done
      }

      // Clear existing (invisble) markers with tooltips
      /*
      if (this.map.box.hasLayer(this.venuemarkers)) {
        this.venuemarkers.clearLayers();
      }
      */
      // Clear existing heatmaps
      if (this.heatmapLayer && this.map.box && this.map.box.hasLayer(this.heatmapLayer)) {
        this.map.box.removeLayer(this.heatmapLayer);
      }

      const heatmapData = {
        max: 100,
        data: this.heatMapData[0]
      };

      this.heatmapLayer = new HeatmapOverlay(this.heatmap_config);

      this.heatmapLayer.setData(heatmapData);

      this.heatmapLayer.addTo(this.map.box);

      // Add leaflet markers (if needeed)
      //this.addVenueMarkers(this.pois);
      //this.addVenueMarkers(this.pois);
      // Update map location and zoom in url params on map drag and zoom

      // animate
      this.init();

    }

  }


  isFomChange(check: string[]): boolean {
    if (check.length === 1 && check.indexOf("form") != -1) {
      return true;
    }
    return false;
  }


  ngOnInit(): void {
    //this.drawHeatMap();
  }

  ngOnChanges(changes: SimpleChanges) {
    let changeObj: string[] = Object.keys(changes);
    this.stop();
    this.drawHeatMap();
    if (this.isFomChange(changeObj)) { return false; } // in case you only need form change

  }

  ngOnDestroy(): void {
    if (this.map.box && this.map.box.hasLayer(this.heatmapLayer)) {
      this.map.box.removeLayer(this.heatmapLayer)
    }
    this.stop();
  }


}
