import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, map, filter } from 'rxjs/operators';
import { Observable, of, forkJoin } from 'rxjs';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';

@Injectable({ providedIn: 'root' })
export class PopularTimesFormService {

    public form$: BehaviorSubject<any> = new BehaviorSubject<any>({
        timeline: 0,
        day: 0,
        days: null,
        startHour: 0,
        endHour: 23,
        speed: 500
    });

    constructor(public http: HttpClient, private router: Router) { }


    public getForm() {
        return this.form$.asObservable();
    }

    public setForm(f: any): void {
        this.form$.next(f);
    }



}
