import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, map, filter } from 'rxjs/operators';
import { of } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class PopularTimesApiService {

    private popularTimesUrl = 'assets/data/samples_popular_times.json';
    public eightDaysData$: BehaviorSubject<any> = new BehaviorSubject(undefined);

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
            if (uniqueIDs.indexOf(d.properties.id) < 0) {
                uniqueIDs.push(d.properties.id);
                result.push(d);
            }
        });
        return result;
    }




    // DEV API fn

    public getPopularTimesData = () => {
        return this.http.get(`${this.popularTimesUrl}`).pipe(
            catchError(this.handleError),
            map((pois: any) => {
                // map data here if needed
                let globalPois = pois.map((poi) => {
                    return poi;
                });
                let uniquePois = this.filterUniqueIds(globalPois); // removes duplicates
                // original data with geometry and google data
                //this.eightDaysData$.next(data);
                return uniquePois;
            })
        );
    }


    public getEightDays() {
        return this.eightDaysData$.asObservable();
    }
    public setEightDays(d) {
        this.eightDaysData$.next(d);
    }
}
