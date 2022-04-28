import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, map, filter } from 'rxjs/operators';
import { of } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class PresenceStatsApiService {

    private presencePoisUrl = 'assets/data/samples_presence.json';
    public presencePois$: BehaviorSubject<any> = new BehaviorSubject(undefined);

    colors: ["#2E86C1", "#E74C3C", "#F1C40F", "#2ECC71", "#7D3C98", "#E67E22"];

    constructor(public http: HttpClient, private router: Router) { }

    // PRO API
    handleError(error: HttpErrorResponse) {
        const kk = null;
        return of(kk);
    }


    // removes duplicates
    filterUniqueIds(data: any) {
        let uniqueIDs: Array<number> = [];
        let result: Array<any> = [];

        data.forEach((d: any) => {
            if (uniqueIDs.indexOf(d.points.properties.id) < 0) {
                uniqueIDs.push(d.points.properties.id);
                result.push(d);
            }
        });
        return result;
    }




    // DEV API fn

    public getPresenceData = () => {
        return this.http.get(`${this.presencePoisUrl}`).pipe(
            catchError(this.handleError),
            map((res) => {
                let study = res;
                let pois = study.points;
                this.setPresencePois(pois);
                return pois;
            })
        );
    }


    public getPresencePois() {
        return this.presencePois$.asObservable();
    }
    public setPresencePois(d) {
        this.presencePois$.next(d);
    }
}
