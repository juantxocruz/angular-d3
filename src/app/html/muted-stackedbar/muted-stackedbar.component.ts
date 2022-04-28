import { Component, OnInit, Input, OnChanges, AfterViewInit } from '@angular/core';
import { SimpleChange } from "@angular/core";

@Component({
  selector: 'app-muted-stackedbar',
  templateUrl: './muted-stackedbar.component.html',
  styleUrls: ['./muted-stackedbar.component.scss']
})
export class MutedStackedbarComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() data: any;
  stacked;


  constructor() { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void { this.stacked = this.data; }

  ngOnChanges(changes: { [propName: string]: SimpleChange }) {
    //console.log('changes', changes, this.svg, this.chartSelected, this.key, this.margin);
    let changeObj = Object.keys(changes);
    this.stacked = this.data;
  };


}
