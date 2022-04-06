import { Component, OnInit, Input } from '@angular/core';
import { SimpleChange } from "@angular/core";
import { ChangeDetectionStrategy } from "@angular/core";
import { ViewEncapsulation } from "@angular/core";
import { DimensionsService } from '../services/dimensiones.service';

import * as d3 from "d3";

export interface WeekDot {
  x: any; // day
  y: string; // hour
  value: number;
}


@Component({
  selector: 'app-heatmap',
  templateUrl: './heatmap.component.html',
  styleUrls: ['./heatmap.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeatmapComponent implements OnInit {
  @Input() data: WeekDot[];
  @Input() layout: any;
  @Input() hour: Date;

  win: any = window; // in use

  // dots
  xField: any;
  // which field name in your data represents the y axis (vertical) - default "y"
  yField: string;
  // which field name in your data represents the data value - default "value"
  valueField: string;

  // data
  design: any;
  style: any;
  rawData: WeekDot[];
  dataChart: any;
  xLabels: Array<string>;
  yLabels: Array<string>;
  // var
  timeout: any = false;
  resize_delay: number = 0;
  default_time: number;
  key: string;
  class: string;

  //containers
  container: any;
  svg: any;
  chartLegend: any;
  legendColors: any;
  legendTexts: any;
  chartOuter: any;
  chartInner: any;

  // sizes
  margin: any;
  height: number = 320;
  width: number;
  // Scales;
  xScale: any;
  yScale: any;
  xDomain: any;
  yDomain: any;
  colors: Array<string>;
  colorScale: any;
  // axis
  xAxis: any;
  yAxis: any;
  tickSize: number;
  removeDomain: boolean;
  borderRadius: number;

  // lang and dictionries
  dictionary: Array<any>;
  lang: string;
  // color max min
  maxVal: number | undefined;
  minVal: number | undefined;

  // color legend
  rectData: any;
  legend: any;
  legendScale: any;
  lAxis: any;
  legendAxis: any;
  legendDomain: Array<number>

  // tooltip
  vBody: any;
  tipLayout: any;
  tipHtml: any;






  constructor(private dimensionsService: DimensionsService) { }

  reshapedata = (): void => {

    this.rawData = this.data.sort((a: WeekDot, b: WeekDot) => d3.ascending(a.x, b.x));
    this.maxVal = d3.max(this.rawData, (d: WeekDot) => d.value);
    this.minVal = d3.min(this.rawData, (d: WeekDot) => d.value);

    // for scale
    this.xDomain = Array.from(new Set(this.rawData.map(d => d.x)));
    this.yDomain = Array.from(new Set(this.rawData.map(d => d.y)));
    // labels
    this.xLabels = this.layout.xLabels ? this.layout.xLabels : this.xDomain;
    this.yLabels = this.layout.yLabels ? this.layout.yLabels : this.yDomain;

    this.yAxis.tickFormat((d: any, i: number) => this.yLabels[i]);
    this.xAxis.tickFormat((d: any, i: number) => this.xLabels[i]);

    this.render();
  }

  private drawAxis() {
    this.chartOuter
      .selectAll(".x.axis")
      .attr("transform", `translate(0, ${this.height})`)
      .transition()
      .duration(this.default_time)
      .call(this.xAxis);


    this.chartOuter
      .selectAll(".y.axis")
      .attr("transform", "translate(0, 0)")
      .transition()
      .duration(this.default_time)
      .call(this.yAxis);

    if (this.removeDomain) {
      this.chartOuter
        .selectAll(".domain").remove();
    }
  }

  public mouseover(d: any, i: number, arr: []): void {
    //console.log('overrr', this);
    d3.select(arr[i]).style("opacity", 0.8);
    this.tipHtml
      .style("cursor", "pointer")
      .style("width", "auto")
      .style("height", "auto")
      .style("display", null)
      .style("opacity", 0.9);
  }


  public mousemove(d: any, i: number, arr: [], e: any): void {

    let text: string = "";
    this.tipHtml
      .html(d.value)
      .style("left", e.pageX - 32 + "px")
      .style("top", e.pageY - 16 + "px");
  }


  public mouseout(d: any, i: number, arr: []): void {
    d3.select(arr[i]).style("opacity", 1);
    this.tipHtml.style("opacity", 0).style("display", "none");
  }




  private drawCells(): void {
    let cells = this.chartInner
      .selectAll("rect.cell")
      .data(this.rawData, (d: WeekDot): string => {
        return d.x + ":" + d.y;
      })

    cells
      .exit()
      .attr("class", "exit")
      .transition()
      .duration(this.default_time / 2)
      .remove();
    cells
      .enter()
      .append("svg:rect")
      .attr("class", "cell")
      .attr("x", (d: WeekDot): number => { return this.xScale(d.x) })
      .attr("y", (d: WeekDot): number => { return this.yScale(d.y) })
      .attr("rx", this.borderRadius)
      .attr("ry", this.borderRadius)
      .attr("width", this.xScale.bandwidth())
      .attr("height", this.yScale.bandwidth())
      .attr("fill-opacity", 0)
      .attr("stroke-opacity", 0)
      .attr("fill", (d: WeekDot): string => {
        return this.colorScale(d.value);
      });
    cells = this.chartInner.selectAll("rect.cell");

    cells
      .transition()
      .duration(this.default_time)
      .on("start", (d: any, i: number, arr: []) => {
        d3.select(arr[i])
          .on("mouseover", null)
          .on("mousemove", null)
          .on("mouseout", null)
          .on("click", null);
      })
      .attr("x", (d: WeekDot): number => { return this.xScale(d.x) })
      .attr("y", (d: WeekDot): number => { return this.yScale(d.y) })
      .attr("height", this.yScale.bandwidth())
      .attr("width", this.xScale.bandwidth())
      .attr("fill-opacity", 1)
      .attr("stroke-opacity", 1)
      .attr("fill", (d: WeekDot) => {
        return this.colorScale(d.value);
      })
      .on("end", (d: any, i: number, arr: []) => {
        d3.select(arr[i])
          .on("mouseover", () => {
            this.mouseover(d, i, arr);
          })
          .on("mousemove", (event) => {
            this.mousemove(d, i, arr, event);
          })
          .on("mouseout", () => {
            this.mouseout(d, i, arr);
          })
          .on("click", null);
      });;
  }

  private drawLegendColors(): void {
    let width = this.layout.legend.width;
    let height = this.layout.legend.height;
    let steps = this.colors.length;

    let legendRects = this.legendColors
      .selectAll("rect.legendRect")
      .data(this.colors);

    legendRects
      .exit()
      .attr("class", "exit")
      .transition()
      .duration(this.default_time / 2)
      .remove();

    legendRects
      .enter()
      .append("svg:rect")
      .attr("class", "legendRect")
      .attr("x", (d: any, i: number) => {
        return (width / steps) * i
      })
      .attr("y", 0)
      .attr("height", height)
      .attr("width", width / steps)
      .attr("fill-opacity", 0)
      .attr("stroke-opacity", 0)
      .attr("fill", (d: any, i: number) => {
        return this.colors[i]
      });
    legendRects = this.legendColors.selectAll("rect.legendRect");
    legendRects
      .transition()
      .duration(this.default_time)
      .attr("x", (d: any, i: number) => {
        return (width / steps) * i
      })
      .attr("y", 0)
      .attr("height", height)
      .attr("width", width / steps)
      .attr("fill-opacity", 1)
      .attr("stroke-opacity", 1)
      .attr("fill", (d: any, i: number) => {
        return this.colors[i]
      });


  }
  private drawLegendTexts(): void {

    let width = this.layout.legend.width;
    let height = this.layout.legend.height;


    let legendTxt = this.legendTexts
      .selectAll("text.legendTxt")
      .data(this.layout.legend.text);

    legendTxt
      .exit()
      .attr("class", "exit")
      .transition()
      .duration(this.default_time / 2)
      .remove();

    legendTxt
      .enter()
      .append("svg:text")
      .attr("class", "legendTxt")
      .attr("x", (d: any, i: number) => {
        return width * i
      })
      .attr("y", 0 + this.layout.legend.margin.top)
      .attr("dy", ".35em")
      .attr("text-anchor", (d: string, i: number) => {
        return i === 0 ? "start" : "end";
      })
      .attr("font-size", this.layout.legend.fontSize)
      .text((d: string) => { return d; });


    legendTxt = this.legendTexts.selectAll("text.legendTxt");
    legendTxt
      .transition()
      .duration(this.default_time)
      .attr("x", (d: any, i: number) => {
        return width * i
      })
      .attr("y", 0 + this.layout.legend.margin.top)
      .attr("dy", ".35em")
      .attr("text-anchor", (d: string, i: number) => {
        return i === 0 ? "start" : "end";
      })
      .attr("font-size", this.layout.legend.fontSize)
      .text((d: string) => { return d; });

  }

  private drawLegend(): void {
    this.drawLegendColors();
    this.drawLegendTexts();
  }

  destroyTooltip(): void {
    this.tipHtml = null;
    this.vBody
      .select("#" + this.tipLayout.id)
      .html("")
      .remove();
  }

  public drawTooltip = (): void => {
    this.tipHtml = this.vBody
      .append("div")
      .attr("class", "tooltip")
      .attr("id", this.tipLayout.id)
      .style("z-index", this.tipLayout.style.z_index)
      .style("font-size", this.tipLayout.style.font_size)
      .style("background-color", this.tipLayout.style.background_color)
      .style("padding", this.tipLayout.style.padding)
      .style("position", this.tipLayout.style.position)
      .style("opacity", 0); //  --> tooltip
  };



  public render(): void {
    let dimensions: any = this.dimensionsService.getDimensions(
      this.svg,
      "#" + this.key,
      this.margin
    );
    this.width = dimensions.width;
    this.height = dimensions.height;

    this.xScale.domain(this.xDomain).range([0, this.width]);
    this.yScale.domain(this.yDomain).range([0, this.height]);
    this.colorScale.domain([this.minVal, this.maxVal]).range(this.colors);

    // Apply to svg
    this.svg
      .attr("width", this.width + this.margin.right + this.margin.left)
      .attr("height", this.height + this.margin.top + this.margin.bottom)
      .attr(
        "viewBox",
        "0 0 " +
        (this.width + this.margin.left + this.margin.right) +
        " " +
        (this.height + this.margin.top + this.margin.bottom)
      )
      .attr("preserveAspectRatio", "xMaxYMax meet");

    this.destroyTooltip();
    this.drawTooltip();
    this.drawAxis();
    this.drawCells();
    if (this.layout.legend.visible) {
      this.drawLegend();
    }
  }


  public runAll = (): void => {


    // SCALES HERE
    this.xScale = d3.scaleBand().paddingInner(this.layout.paddingInner);
    this.yScale = d3.scaleBand().padding(this.layout.padding);
    this.xAxis = d3.axisBottom(this.xScale).tickSize(this.tickSize);
    this.yAxis = d3.axisLeft(this.yScale).tickSize(this.tickSize);

    //   this.colorScale.domain([this.minVal, this.maxVal]).range(this.colors);
    this.colorScale = d3.scaleQuantize();

    // ELEMENTS
    this.container = d3.select("#" + this.key); // placeholder div for svg
    this.svg = this.container
      .selectAll("svg")
      .data([{}])
      .enter()
      .append("svg:svg");

    this.chartLegend = this.svg
      .selectAll("g.chartLegend")
      .data([{}])
      .enter()
      .append("svg:g")
      .attr("class", "chartLegend")
      .attr("transform", "translate(" + this.margin.left + "," + (this.height - this.margin.bottom) + ")");

    this.legendColors = this.chartLegend
      .selectAll("g.legendColors") // chart without axis to clipPath
      .data([{}])
      .enter()
      .append("svg:g")
      .attr("class", "legendColors")
      .attr("transform", "translate(" + 0 + "," + this.legend.margin.top + ")");

    this.legendTexts = this.chartLegend
      .selectAll("text.legendText") // chart without axis to clipPath
      .data([{}])
      .enter()
      .append("svg:g")
      .attr("class", "legendText")
      .attr("transform", "translate(" + 0 + "," + this.legend.margin.top + ")");


    this.chartOuter = this.svg
      .selectAll("g.chartOuter")
      .data([{}])
      .enter()
      .append("svg:g")
      .attr("class", "chartOuter")
      .attr(
        "transform",
        "translate(" + this.margin.left + "," + this.margin.top + ")"
      );

    this.chartInner = this.chartOuter
      .selectAll("g.chartInner") // chart without axis to clipPath
      .data([{}])
      .enter()
      .append("svg:g")
      .attr("class", "chartInner");

    // Axis groups
    this.chartOuter
      .selectAll(".x.axis")
      .data([{}])
      .enter()
      .append("svg:g")
      .attr("class", "x axis");
    this.chartOuter
      .selectAll(".y.axis")
      .data([{}])
      .enter()
      .append("svg:g")
      .attr("class", "y axis");
    this.win.addEventListener("resize", () => {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.render();
      }, this.resize_delay);
    });

    this.reshapedata();


  }



  public destroyChart = (): void => {
    d3.select("#" + this.key).html("");
    // Stop resize events
    d3.select(this.win).on("resize", null);
  };


  public init(): void {
    //this.destroyTooltip();
    this.destroyChart();
    this.runAll();
  }


  ngAfterViewInit(): void {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.init();
    }, this.resize_delay);

    //window.dispatchEvent(new Event('resize'));
  }



  ngOnChanges(changes: { [propName: string]: SimpleChange }) {
    //console.log('changes', changes, this.svg, this.chartSelected, this.key, this.margin);
    let changeObj = Object.keys(changes);


    this.vBody = d3.select("body");
    this.key = this.layout.key;
    this.class = this.layout.class;
    this.height = this.layout.height;
    this.margin = this.layout.margin;
    this.legend = this.layout.legend;

    this.resize_delay = this.layout.default_time;
    this.colors = this.layout.colors ? this.layout.colors : ['#ff0000', '#ffb200', '#00A100'];

    // not in use 
    this.xField = this.layout.xField ? this.layout.xField : "x";
    this.yField = this.layout.yField ? this.layout.yField : "y";
    this.valueField = this.layout.valueField ? this.layout.valueField : "value";
    this.tickSize = this.layout.tickSize === 0 ? 0 : this.layout.tickSize ? this.layout.tickSize : 4;
    this.borderRadius = this.layout.borderRadius ? this.layout.borderRadius : 0;
    this.dictionary = this.layout.dictionary;
    this.lang = this.layout.lang ? this.layout.lang : 'es';

    this.removeDomain = this.layout.removeDomain;
    this.tipLayout = this.layout.tooltip;


    if (changes["data"] && changeObj.length === 1) {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.reshapedata();
      }, this.resize_delay / 4);

    }
    return "";
  }




  ngOnInit(): void {
  }

}
