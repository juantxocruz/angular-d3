import { Injectable } from "@angular/core";
import * as d3 from "d3";

@Injectable({ providedIn: "root" })
export class LocaleEsService {
  public es_ES: any = {
    decimal: ",",
    thousands: ".",
    grouping: [3],
    currency: ["", "\u00a0€"],
    dateTime: "%a %b %e %X %Y",
    date: "%d/%m/%Y",
    time: "%H:%M:%S",
    periods: ["AM", "PM"],
    days: [
      "Domingo",
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
    ],
    shortDays: ["Dom", "Lun", "Mar", "Mi", "Jue", "Vie", "Sab"],
    months: [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ],
    shortMonths: [
      "Ene",
      "Feb",
      "Mar",
      "Abr",
      "May",
      "Jun",
      "Jul",
      "Ago",
      "Sep",
      "Oct",
      "Nov",
      "Dic",
    ],
  };

  public format_ES = d3.formatLocale(this.es_ES);
  public format = this.format_ES.format;
  public formatPrefix = this.format_ES.formatPrefix;

  public time_ES = d3.timeFormatLocale(this.es_ES);
  public timeFormat = this.time_ES.format;
  public timeParse = this.time_ES.parse;
  public utcFormat = this.time_ES.utcFormat;
  public utcParse = this.time_ES.utcParse;

  public formatLongYear = this.timeFormat("%Y"); // 2019
  public formatSortYear = this.timeFormat("%y"); // 2019

  public formatMonthLong = this.timeFormat("%B");
  public formatMonthSort = this.timeFormat("%b");
  public formatInfoDay = this.timeFormat("%B de %Y");

  public formatThousands = this.format(",.0f");
  public FORMATPER: any = this.format(".0%"); // 7 --> 700%
  public FORMATROUND: any = this.format(".2f"); // 2,00
  public formatRound_1f: any = this.format(".1f"); // 2,0
  public formatRound_2f: any = this.format(".2f"); // 2,00
  public formatZero: any = this.format(",.0f"); // 7.5 --> 7 // formatThousands

  public formatMillions: any = this.formatPrefix(".2", 1e6); // SI-prefix with two significant digits, "42,0M"
}
