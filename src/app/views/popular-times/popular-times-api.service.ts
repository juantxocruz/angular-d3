import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, map, filter } from 'rxjs/operators';
import { Observable, of, forkJoin } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class PopularTimesApiService {

    private popularTimesUrl = 'assets/data/samples_popular_times.json';
    public sevenDaysData$: BehaviorSubject<any> = new BehaviorSubject(undefined);
    globalPois: any;
    uniquePois: any;
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
                this.globalPois = pois.map((poi) => {
                    return poi;
                });
                this.uniquePois = this.filterUniqueIds(this.globalPois); // removes duplicates
                // original data with geometry and google data
                //this.sevenDaysData$.next(data);
                return this.uniquePois;
            })
        );
    }


    public getSevenDays() {
        return this.sevenDaysData$.asObservable();
    }
    public setSevenDays(d) {
        this.sevenDaysData$.next(d);
    }
}
