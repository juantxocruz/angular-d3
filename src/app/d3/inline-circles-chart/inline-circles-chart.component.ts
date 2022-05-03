import { Component, OnInit, Input, SimpleChange } from '@angular/core';
import { DefaultVarsService } from '../services/default-vars.service';
import { DimensionsService } from '../services/dimensiones.service';
import { AxisTitleService } from '../services/axis-title.service';
import * as d3 from "d3";

@Component({
  selector: 'app-inline-circles-chart',
  templateUrl: './inline-circles-chart.component.html',
  styleUrls: ['./inline-circles-chart.component.scss']
})
export class InlineCirclesChartComponent implements OnInit {

  @Input() circlesLayout: any;
  @Input() hour: Date;
  height: number;
  width: number;
  key: string;
  class: string;
  chartId: string;

  resize_delay: 400;
  // var here
  win: any = window; // in use
  dataChart: any;
  timeout: any = false;
  margin: any = {}
  style: any = {};
  vBody: any;
  container: any;
  svg: any;
  chartOuter: any;
  chartInner: any;
  chartGroups: any;
  zeroLine: any;
  chartLegend: any;
  viewChartLegend: boolean;
  measure: string;
  tooltipKeys: any;
  tooltipElem: any;


  // scales
  xScale: any;
  colorScale: any;

  // axis names
  xAxis: any;
  yAxis: any;

  // averages and extends

  xDomain: Array<number>;
  yDomain: Array<number>;
  min: number;
  max: number;
  mean: number;




  constructor(
    private defaultVarsService: DefaultVarsService,
    private dimensionsService: DimensionsService,
    private axisTitleService: AxisTitleService) { }



  reshapedata() {
    this.dataChart = this.circlesLayout.data.children;

    this.xDomain = this.dataChart.map((d) => {
      return d["category"];
    });

    let y;

    // render everything!
    this.render();
  }

  public drawCirclesGroups(): void {
    let xScale = this.xScale;
    const default_time: number = this.defaultVarsService.default_time;

    // Create a group to store the 'nodes'

    let chartGroups = this.chartInner
      .selectAll("g.chartGroup")
      .data(this.dataChart);

    // Exit the nodes
    chartGroups
      .exit()
      .attr("class", "exit")
      .transition()
      .duration(default_time / 2)
      .remove();

    chartGroups
      .enter()
      .append("svg:g")
      .attr("class", "chartGroup")
      .attr("transform", (d) => {
        return "translate(" + xScale(d.category) + ",0)";
      });

    chartGroups = this.chartInner.selectAll("g.chartGroup");
    chartGroups
      .transition()
      .duration(default_time)
      .attr("transform", (d) => {
        return "translate(" + xScale(d.category) + ",0)";
      });
  }
  public drawCircles(): void {
    const default_time: number = this.defaultVarsService.default_time;
    const colorScale = this.colorScale;
    const fill = this.style.fill;
    let circles = this.chartInner
      .selectAll("g.chartGroup")
      .selectAll(".circle")
      .data((d, i) => [d]);

    circles
      .exit()
      .attr("class", "exit")
      .transition()
      .duration(default_time / 2)
      .remove();

    circles
      .enter()
      .append("svg:circle")
      .attr("class", "circle")
      .attr("cy", 60)
      .attr("cx", function (d, i) {
        return (i * 60) + 100;
      })
      .attr("r", function (d) {
        return d.value.percent;
      })
      .attr("fill", (d, i) => {
        if (this.style.fill) {
          return this.style.fill;
        } else {
          return colorScale(d);

        }
      });

    circles = this.chartInner.selectAll("g.chartGroup").selectAll("circle.circle");

    circles
      .transition()
      .duration(default_time)
      .on("start", (d, i, arr) => {
        d3.select(arr[i])
          .on("mouseover", null)
          .on("mousemove", null)
          .on("mouseout", null)
          .on("click", null);
      })
      .attr("cy", 60)
      .attr("cx", function (d, i) {
        return (i * 60) + 60;
      })
      .attr("r", function (d) {
        return d.value.percent;
      })
      .attr("fill", (d, i) => {
        if (this.style.fill) {
          return this.style.fill;
        } else {
          return colorScale(d);

        }
      });


  }

  public drawAxis(): void {
    this.chartOuter
      .selectAll(".x.axis")
      .attr("transform", `translate(0, ${this.height})`)
      .transition()
      .duration(this.defaultVarsService.default_time)
      .call(this.xAxis);

    // add color to print axis
    let axis = this.chartOuter.selectAll(".axis");

    let txt = axis.selectAll("text")
      .style("fill", '#cccccc');




    // Append axis titles
    this.chartOuter
      .selectAll(".x.axis")
      .selectAll(".axis_title")
      .data([{}])
      .enter()
      .append("svg:text")
      .attr("class", "axis_title")
      .attr("text-anchor", "middle")
      .style("fill", '#6e6e6e')
      .merge(this.chartOuter.selectAll(".x.axis").selectAll(".axis_title"))
      .text(this.axisTitleService.switchTitle(this.circlesLayout.data.categories))
      .attr(
        "transform",
        `translate(${this.width / 2}, ${this.margin.bottom / 1.4})`
      );


  }


  public render(): void {
    // dimensions
    let dimensions: any = this.dimensionsService.getDimensions(
      this.svg,
      "#" + this.chartId,
      this.margin
    );
    this.colorScale.range(this.style.colors);
    this.width = dimensions.width;
    this.height = dimensions.height;
    this.xScale.domain(this.xDomain).range([0, this.width]);
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
    this.drawCirclesGroups();
    this.drawCircles();


  }


  public runAll = (): void => {
    this.colorScale = d3.scaleOrdinal();
    this.xScale = d3.scaleBand().paddingInner(this.style.paddingInner);

    ////////// Initialize axis //////////
    this.xAxis = d3.axisBottom(this.xScale);
    // ELEMENTS
    this.container = d3.select("#" + this.chartId); // placeholder div for svg
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
      .attr("transform", "translate(" + this.margin.left + "," + 0 + ")");

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
    d3.select("#" + this.chartId).html("");
    // Stop resize events
    d3.select(this.win).on("resize", null);
  };

  public drawTooltip = (): void => {
    this.tooltipElem = this.vBody
      .append("div")
      .attr("class", "tooltip")
      .attr("id", this.tooltipKeys.id)
      .style("z-index", this.tooltipKeys.style.z_index)
      .style("font-size", this.tooltipKeys.style.font_size)
      .style("background-color", this.tooltipKeys.style.background_color)
      .style("padding", this.tooltipKeys.style.padding)
      .style("position", this.tooltipKeys.style.position)
      .style("opacity", 0); //  --> tooltip
  };


  destroyTooltip() {
    this.tooltipElem = null;
    this.vBody
      .select("#" + this.tooltipKeys.id)
      .html("")
      .remove();
  }


  public init(): void {
    this.destroyTooltip();
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
    //console.log('changes', changes, this.svg, this.chartSelected, this.chartId, this.margin);
    let changeObj = Object.keys(changes);
    this.height = this.circlesLayout.design.height;
    this.key = this.circlesLayout.key;
    this.chartId = this.key;
    this.class = this.circlesLayout.class;

    this.resize_delay = this.circlesLayout.resize_delay ? this.circlesLayout.resize_delay : this.defaultVarsService.resize_delay;
    this.margin = this.circlesLayout.design.margin;
    this.style = this.circlesLayout.design.style;

    this.vBody = d3.select("body");
    this.tooltipKeys = this.circlesLayout.tooltip;


    if (changeObj.length < 2) {
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
