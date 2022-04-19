import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, map, filter } from 'rxjs/operators';
import { Observable, of, forkJoin } from 'rxjs';
import * as L from 'leaflet';


@Injectable({ providedIn: 'root' })
export class PopularTimesMapService {

    map: any;
    public map$: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);


    private markerIcon: any = {
        iconUrl: '../../../../assets/img/markers/glocally-brick-purple.svg',
        iconSize: [40, 80],
        iconAnchor: [25, 40],
        popupAnchor: [7, 100]
    };

    private markerOptions: any = {
        name: 'marker_pane',
        zIndex: 100,
        width: 80
    };


    constructor(public http: HttpClient, private router: Router) {

        this.map = {
            id: 'map_elementRef',
            change: '',
            access_token: null,
            box: null,
            layers: {}, // object containing layers
            geojsonLayer: null,
            transitLayer: null,
            studyLayer: null,
            cpsLayer: null,
            bounds: null,
            properties: {
                center: [42.1357507222081, -0.41074235303953105], // huesca center
                minZoom: 6,
                zoom: 17,
                maxZoom: 20,
                maxNativeZoom: 19,
                maxBounds: L.latLngBounds([L.latLng(45, 27), L.latLng(4.333333, -25)]),
                dragging: true,
                touchZoom: true,
                scrollWheelZoom: true,
                boxZoom: true,
                zoomControl: false,
                address: 'any',
                locality: 'any',
                province: 'any'
            },
            zoom: {
                position: 'topright',
                zoomInText: '+',
                zoomOutText: '-'
            },
            zoomCtrl: null,
            tileLayer: null,
            openStreetMapLayer: L.tileLayer(
                'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: 'Map data &copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://cloudmade.com">CloudMade</a>',
                maxZoom: 18
            }),
            arcGisMapLayer: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
                attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
            }),
            attribution: {
                attribution:
                    'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
                    '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                    'Imagery © <a href="http://mapbox.com">Mapbox</a>'
            },
            marker: {
                icon: this.markerIcon,
                options: this.markerOptions,
                l: null
            },
            popUp: {
                visible: false,
                options: {
                    direction: 'right',
                    permanent: false,
                    offset: [0, 0],
                    opacity: 0,
                    className: 'customPopUp',
                    maxWidth: 0
                },
                info: {
                    on: ``,
                    off: ``
                }
            },
            area: {
                style: {
                    default: {
                        color: 'orange',
                        weight: 2,
                        fillOpacity: 0.32,
                        opacity: 0.65,
                        dashArray: '0'
                    },
                    mouseover: {
                        fillOpacity: 0.4
                    },
                    mouseout: {
                        fillOpacity: 0.32
                    },
                    click: {
                        color: 'red',
                        weight: 2,
                        opacity: 0.32,
                        fillOpacity: 0.24,
                        dashArray: '0'
                    }
                },
                prevLayerClicked: null,
                layerClicked: null
            },
            data: null,
            info_control: null,
            minMaxScales: [],
            color_key: null,
            pois: []
        };

    }

    public initMap(properties: any): any {
        this.map.id = properties.id ? properties.id : this.map.id;
        this.map.properties.center = properties.center
            ? properties.center
            : this.map.properties.center;
        this.map.openStreetMapLayer = properties.openStreetMapLayer
            ? properties.openStreetMapLayer
            : this.map.properties.openStreetMapLayer;
        this.map.arcGisMapLayer = properties.arcGisMapLayer
            ? properties.arcGisMapLayer
            : this.map.properties.arcGisMapLayer;

        this.map.marker = properties.marker
            ? properties.marker
            : this.map.properties.marker;

        return this.map;

    }

    public setId(id): void {
        this.map.id = id;
    }

    public setMapCenter(center: Array<any>): void {
        this.map.properties.center[0] = center[0];
        this.map.properties.center[1] = center[1];
    }


    public setZoomMap(value: number): void {
        this.map.zoom = value;
        this.map.box.setZoom(value);
    }

    public getMap() {
        return this.map$.asObservable();
    }

    public setMap(map: any): void {
        this.map$.next(map);
    }

}
