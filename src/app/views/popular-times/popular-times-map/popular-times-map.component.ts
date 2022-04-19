import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { icon, Marker } from 'leaflet';
import * as L from 'leaflet';
import HeatmapOverlay from 'leaflet-heatmap';
import { PopularTimesMapService } from './popular-times-map.service';

@Component({
  selector: 'app-popular-times-map',
  templateUrl: './popular-times-map.component.html',
  styleUrls: ['./popular-times-map.component.scss']
})
export class PopularTimesMapComponent implements OnInit, AfterViewInit {

  @ViewChild('map_elementRef', { static: false }) map_elementRef: ElementRef;

  map_leaflet: any;
  defaultZoom: number = 16;

  markerIcon: any = {
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    shadowSize: [41, 41],
    iconRetinaUrl: './assets/marker-icon-2x.png',
    iconUrl: './assets/marker-icon.png',
    shadowUrl: './assets/marker-shadow.png',
    className: 'marker-icon-b'

  }
  markerOptions: any = {
    name: 'marker_pane',
    zIndex: 100,
    width: 80
  };


  mapSetUp: any = {
    id: 'map_elementRef',
    theme: 'light',
    center: [40.423686379181405, -3.710858047841252],
    openStreetMapLayer: L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://cloudmade.com">CloudMade</a>',
      maxZoom: 18
    }),
    arcGisMapLayer: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
    }),
    marker: {
      icon: this.markerIcon,
      options: this.markerOptions,
      l: null
    },
    box: null

  };





  venuemarkers: L.LayerGroup = new L.LayerGroup(); //new Array();
  marker = L.marker(this.mapSetUp.center, this.mapSetUp.marker.icon);

  constructor(private popularTimesMapService: PopularTimesMapService) {


  }

  public drawMap() {
    this.map_leaflet.box = L.map(this.map_elementRef.nativeElement, {
      //fullscreenControl: true,
      center: this.mapSetUp.center,
      zoom: this.defaultZoom,
      layers: [this.mapSetUp.arcGisMapLayer, this.venuemarkers],
      scrollWheelZoom: false, // disable original zoom function
      // smoothWheelZoom: true,  // enable smooth zoom
      // smoothSensitivity: 1,   // zoom speed. default is 1
      //leaflet buildin fractional zoom
      // scrollWheelZoom: true, // disable original zoom function
      // zoomSnap: 0.1
    });
    this.marker.addTo(this.map_leaflet.box);
  }


  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.map_leaflet = this.popularTimesMapService.initMap(this.mapSetUp);

    this.drawMap();
    this.popularTimesMapService.setMap(this.map_leaflet);
    // this.drawHeatMap();
  }

}
