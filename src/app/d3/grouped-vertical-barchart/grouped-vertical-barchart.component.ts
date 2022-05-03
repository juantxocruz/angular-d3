import { Component, OnInit, Input } from '@angular/core';
import { SimpleChange } from "@angular/core";
import { ChangeDetectionStrategy } from "@angular/core";
import { ViewEncapsulation } from "@angular/core";
import { DimensionsService } from "../services/dimensiones.service";
import { DefaultVarsService } from "../services/default-vars.service";
import { LocaleEsService } from "../services/locale-es.service";
import { AxisTitleService } from "../services/axis-title.service";
import { MeasureService } from "../services/measure.service";
import { ColorsService } from '../services/colors.service';
import { WordingService } from "../services/wording.service";
import * as d3 from "d3";
@Component({
  selector: 'app-grouped-vertical-barchart',
  templateUrl: './grouped-vertical-barchart.component.html',
  styleUrls: ['./grouped-vertical-barchart.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupedVerticalBarchartComponent implements OnInit {

  @Input() chartLayout: any;
  @Input() hour: Date;
  height: number;
  width: number;
  key: string;
  class: string;
  chartId: string;
  style: any;
  dictionary: Array<any>;
  margin: any; // chart containers
  containers: Array<string>;
  container: any;
  svg: any;
  chartOuter: any;
  chartInner: any;
  chartGroups: any;
  zeroLine: any;
  chartLegend: any;
  viewChartLegend: boolean;
  measure: string;

  //keys
  xKeys: Array<string>;

  // scales
  xScale: any;
  xScaleBars: any;
  yScale: any;
  colorScale: any;
  colors;
  // var here
  win: any = window; // in use
  dataChart: any;
  timeout: any = false;
  resize_delay: number;

  // axis names
  xAxis: any;
  yAxis: any;

  // averages and extends

  xDomain: Array<number>;
  yDomain: Array<number>;
  min: number;
  max: number;
  mean: number;

  // legend
  legendKeys: Array<any>;
  legendScaleDomain: Array<string>;
  legendScale: any;



  // tooltip
  vBody: any;
  tooltipElem: any;
  tooltipKeys: any;

  constructor(
    private dimensionsService: DimensionsService,
    private defaultVarsService: DefaultVarsService,
    private colorsService: ColorsService,
    private axisTitleService: AxisTitleService,
    private measureService: MeasureService,
    private localeEsService: LocaleEsService,
    private wordingService: WordingService) {
  }

  // to be complete
  private getLegendFromKeys = (arr) => {
    let arrL = arr.length;
    let i = 0;
    let result = [];

    for (i; i < arrL; i++) {
      result.push({
        value: arr[i],
        index: i,
        name: arr[i]
      });
    }
    return result;
  };



  reshapedata() {
    this.dataChart = this.chartLayout.data.children;
    this.xKeys = Object.keys(this.dataChart[0]);
    this.xKeys.shift();

    this.min = d3.min(this.dataChart, (d) => {
      return d3.min(this.xKeys, (key) => {
        return +d[key];
      });
    });
    this.max = d3.max(this.dataChart, (d) => {
      return d3.max(this.xKeys, (key) => {
        return +d[key];
      });
    });
    this.mean = d3.mean(this.dataChart, (d) => {
      return d3.mean(this.xKeys, (key) => {
        return +d[key];
      });
    });
    this.yDomain = [this.min >= 0 ? 0 : this.min, this.max];

    this.xDomain = this.dataChart.map((d) => {
      return d["category"];
    });

    this.legendKeys = this.getLegendFromKeys(this.xKeys);
    this.legendScaleDomain = this.legendKeys.map((d) => {
      return d["value"];
    });

    // render everything!
    this.render();
  }

  public render(): void {
    // dimensions
    let dimensions: any = this.dimensionsService.getDimensions(
      this.svg,
      "#" + this.chartId,
      this.margin
    );
    this.width = dimensions.width;
    this.height = dimensions.height;
    this.yScale.rangeRound([this.height, 0]).domain(this.yDomain).nice();
    this.colorScale.range(this.style.colors);
    this.xScale.domain(this.xDomain).range([0, this.width]);
    this.xScaleBars.domain(this.xKeys).rangeRound([0, this.xScale.bandwidth()]);
    this.legendScale.domain(this.legendScaleDomain).range([0, this.width]);
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
    this.drawBarGroups();
    this.drawBars();
    if (this.viewChartLegend) {
      // this.drawLegendGroups();
      //this.drawChartLegend();
    }


  }



  public drawAxis(): void {
    this.chartOuter
      .selectAll(".x.axis")
      .attr("transform", `translate(0, ${this.height})`)
      .transition()
      .duration(this.defaultVarsService.default_time)
      .call(this.xAxis);
    this.chartOuter
      .selectAll(".y.axis")
      .attr("transform", "translate(0, 0)")
      .transition()
      .duration(this.defaultVarsService.default_time)
      .call(this.yAxis);

    // add color to print axis
    let axis = this.chartOuter.selectAll(".axis");
    let lines = axis.selectAll("line")
      .style("stroke", this.colors.gray_dark);
    let txt = axis.selectAll("text")
      .style("fill", this.colors.gray_dark);

    let zeroLine = this.chartInner.selectAll("line.zeroLine").data([{}]);
    zeroLine
      .exit()
      .attr("class", "exit")
      .transition()
      .duration(this.defaultVarsService.default_time / 2)
      .remove();

    zeroLine
      .enter()
      .append("svg:line")
      .attr("class", "zeroLine")
      .attr("stroke", this.chartLayout.design.stroke.stroke)
      .attr("y1", this.yScale(0))
      .attr("y2", this.yScale(0))
      .attr("x1", 0)
      .attr("x2", this.width);

    zeroLine = this.chartInner.selectAll(".zeroLine");

    zeroLine
      .transition()
      .duration(this.defaultVarsService.default_time)
      .attr("y1", this.yScale(0))
      .attr("y2", this.yScale(0))
      .attr("x1", 0)
      .attr("x2", this.width);

    let meanLine = this.chartInner.selectAll("line.meanLine").data([{}]);
    meanLine
      .exit()
      .attr("class", "exit")
      .transition()
      .duration(this.defaultVarsService.default_time / 2)
      .remove();

    meanLine
      .enter()
      .append("svg:line")
      .attr("class", "meanLine")
      .attr("stroke", this.chartLayout.design.stroke.stroke)
      .attr("stroke-dasharray", 0.9)
      .attr("y1", this.yScale(0))
      .attr("y2", this.yScale(0))
      .attr("x1", 0)
      .attr("x2", this.width);

    meanLine = this.chartInner.selectAll("line.meanLine");

    meanLine
      .transition()
      .duration(this.defaultVarsService.default_time)
      .attr("y1", this.yScale(this.mean))
      .attr("y2", this.yScale(this.mean))
      .attr("x1", 0)
      .attr("x2", this.width);


    // Append axis titles
    this.chartOuter
      .selectAll(".x.axis")
      .selectAll(".axis_title")
      .data([{}])
      .enter()
      .append("svg:text")
      .attr("class", "axis_title")
      .attr("text-anchor", "middle")
      .style("fill", this.colors.gray_dark)
      .merge(this.chartOuter.selectAll(".x.axis").selectAll(".axis_title"))
      .text(this.axisTitleService.switchTitle(this.chartLayout.data.categories))
      .attr(
        "transform",
        `translate(${this.width / 2}, ${this.margin.bottom / 1.4})`
      );

    this.chartOuter
      .selectAll(".y.axis")
      .selectAll(".axis_title")
      .data([{}])
      .enter()
      .append("svg:text")
      .attr("class", "axis_title")
      .attr("text-anchor", "middle")
      .style("fill", this.colors.gray_dark)
      .merge(this.chartOuter.selectAll(".y.axis").selectAll(".axis_title"))
      .text(this.axisTitleService.switchTitle(this.chartLayout.data.format))
      .attr(
        "transform",
        `translate(${-this.margin.left / 1.3}, ${this.height / 2}) rotate(-90)`
      );
  }

  public drawBarGroups(): void {
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
  public drawBars(): void {
    let xKeys = this.xKeys;
    let xScaleBars = this.xScaleBars;
    let yScale = this.yScale;
    let colorScale = this.colorScale;
    let height = this.height;
    const default_time: number = this.defaultVarsService.default_time;

    let bars = this.chartInner
      .selectAll("g.chartGroup")
      .selectAll("rect.bar")
      .data((d, i) => {
        return xKeys.map((key) => {
          return {
            key: key,
            value: !!d[key] ? d[key] : 0,
            category: d["category"],
            index: key,
          };
        });
      });

    bars
      .exit()
      .attr("class", "exit")
      .transition()
      .duration(default_time / 2)
      .remove();

    bars
      .enter()
      .append("svg:rect")
      .attr("class", "bar")
      .attr("x", (d) => {
        return xScaleBars(d.key);
      })
      //If the value is negative, put the top left corner of the rect bar on the zero line
      .attr("y", (d) => {
        //Grouped bar chart, with only POSITIVE values
        // Grouped bar chart, with negative values
        return d.value < 0 ? yScale(0) : yScale(d.value);
      })
      .attr("width", xScaleBars.bandwidth())
      .attr("data-index", (d) => {
        return d.index;
      })
      .attr("height", (d) => {
        return Math.abs(yScale(d.value) - yScale(0));
      })
      .attr("fill", (d, i) => {

        return colorScale(i);
        // return colorScale(d.key); // array order, not sorting

      });

    bars = this.chartInner.selectAll("g.chartGroup").selectAll("rect.bar");

    bars
      .transition()
      .duration(default_time)
      .on("start", (d, i, arr) => {
        d3.select(arr[i])
          .on("mouseover", null)
          .on("mousemove", null)
          .on("mouseout", null)
          .on("click", null);
      })
      .attr("x", (d) => {
        return xScaleBars(d.key);
      })
      .attr("y", (d) => {
        return d.value < 0 ? yScale(0) : yScale(d.value);
      })
      .attr("width", xScaleBars.bandwidth())
      .attr("data-index", (d) => {
        return d.index;
      })
      .attr("height", (d) => {
        return Math.abs(yScale(d.value) - yScale(0));
      })
      .attr("fill", (d, i) => {

        return colorScale(i); // working fine
        //return colorScale(d.key);
      })
      .on("end", (d, i, arr) => {
        d3.select(arr[i])
          .on("mouseover", () => {
            this.mouseover(d, i, arr);
          })
          .on("mousemove", (e) => {
            this.mousemove(e, d);
          })
          .on("mouseout", () => {
            this.mouseout(d, i, arr);
          })
          .on("click", null);
      });
  }

  public mouseover(d, i, arr): void {
    //console.log('overrr', this);
    d3.select(arr[i]).style("opacity", 0.8);
    this.tooltipElem
      .style("cursor", "pointer")
      .style("width", "auto")
      .style("height", "auto")
      .style("display", null)
      .style("opacity", 0.9);
  }
  public mousemove(e, d): void {
    // d: {key: "tienda", value: 9999923, category: "Total", index: "tienda_4_Total"}
    // i: 0
    // arr[i]: <rect class="bar" </rect>
    // d3.event.target : <rect class="bar" </rect>
    // d3.event.target.nodeName: rect
    // d3.event: MouseEvent {isTrusted: true, screenX: -405, screenY: 574, clientX: 952, clientY: 440, …}
    // this: GroupedVerticalBarChartComponent

    let text: string = "";
    if (this.tooltipKeys.header) {
      if (this.tooltipKeys.header === "index") {
        text +=
          "<strong>" +
          this.wordingService.getDictionaryName(
            this.dictionary[0].name,
            this.dictionary[0].key,
            d.index
          ) +
          "</strong>" +
          "<br />";
      } else {
        text +=
          "<strong>" +
          this.wordingService.getDictionaryName(
            this.dictionary[0].name,
            this.dictionary[0].key,
            d.key
          ) +
          "</strong>" +
          "<br />";
      }

    }


    if (this.measure === "val") {
      text += this.localeEsService.formatThousands(d.value);
      text += this.tooltipKeys.measure && this.tooltipKeys.measure.value
        ? " " + this.tooltipKeys.measure.value
        : "";
    }
    if (this.measure === "perf") {
      text += this.localeEsService.FORMATROUND(d.value);
      text += "%";
    }
    this.tooltipElem
      .html(text)
      .style("left", e.pageX - 32 + "px")
      .style("top", e.pageY - 60 + "px");
  }

  public mouseout(d, i, arr): void {
    d3.select(arr[i]).style("opacity", 1);
    this.tooltipElem.style("opacity", 0).style("display", "none");
  }



  public runAll = (): void => {
    this.colorScale = d3.scaleOrdinal();
    this.xScale = d3.scaleBand().paddingInner(this.style.paddingInner);
    this.xScaleBars = d3.scaleBand().padding(this.style.padding);
    this.yScale = d3.scaleLinear();

    this.legendScale = d3.scaleBand().paddingInner(this.style.paddingInner);

    ////////// Initialize axis //////////
    this.xAxis = d3.axisBottom(this.xScale);
    this.yAxis = d3.axisLeft(this.yScale);
    ////////// initialize axis //////////


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
    this.height = this.chartLayout.design.height;
    this.key = this.chartLayout.key;
    this.chartId = this.key;
    this.class = this.chartLayout.class;
    this.colors = this.colorsService.colors;
    this.resize_delay = this.chartLayout.resize_delay ? this.chartLayout.resize_delay : this.defaultVarsService.resize_delay;
    this.margin = this.chartLayout.design.margin;
    this.style = this.chartLayout.design.style;
    this.dictionary = this.chartLayout.dictionary;
    this.vBody = d3.select("body");
    this.tooltipKeys = this.chartLayout.tooltip;
    this.viewChartLegend = this.chartLayout.viewChartLegend;
    this.measure = this.measureService.switchMeasure(this.chartLayout.data.format)
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
