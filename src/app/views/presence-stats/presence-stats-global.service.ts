import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, map, filter } from 'rxjs/operators';
import { of } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class PresenceStatsGlobalService {


    public colors: Array<string> = ["#2E86C1", "#E74C3C", "#F1C40F", "#2ECC71", "#7D3C98", "#E67E22"];
    public dictionary: any = {
        "H": "casa",
        "O": "frecuente",
        "W": "trabajo",
        "NF": "no frecuente",
        "T": "transito",
        "h": "casa",
        "o": "frecuente",
        "e": "trabajo",
        "nf": "no frecuente",
        "t": "transito",
        "P00": "00:00-07:59",
        "P01": "08:00-13:59",
        "P02": "14:00-20:59",
        "P03": "21:00-23:59",
        "I00": "0-7000",
        "I01": "7000-10000",
        "I02": "10000-12000",
        "I03": "12000-15000",
        "I04": "15000-inf",
        "A00": "0-25",
        "A01": "25-45",
        "A02": "45-65",
        "A03": "65-100",
        "municipality": "Municipio",
        "zip_code": "Código Postal",
        "province": "Provincia",
        "country": "Nacional",
        "ccaa": "Comunidad Autónoma",
        "1W": "1 semana",
        "2W": "2 semanas",
        "1M": "1 mes",
        "1Y": "1 año",
        "female": "Mujeres",
        "male": "Hombres",
        "others": "Otros",
        "spain": "España"
    }



    public getColor() {
        return this.colors;
    }

    public getDictionary() {
        return this.dictionary;
    }

    public capitalize(word) {
        return word
            .toLowerCase()
            .replace(/\w/, firstLetter => firstLetter.toUpperCase());
    }


    constructor(public http: HttpClient, private router: Router) { }

    filterSelectedPois(pois, form) {

        let result = pois.filter((poi: any) => {

            return form.indexOf(poi.properties.id) !== -1
        });
        return result;

    }

    colorSelectedPois(pois) {

        let result = pois.map((poi: any, index: number) => {
            poi.properties.color = this.colors[index];
            return poi;
        });
        return result;
    }


    setCards(pois) {

    }
    reshapeSelectedPois(pois, form) {
        if (pois && form) {
            let filtered = this.filterSelectedPois(pois, form);
            let colored = this.colorSelectedPois(filtered);
            return colored;
        }
        return false;

    }


}
