import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class ColorsService {
  public colors = {
    primary_color: "#254f9a",
    primary_color_deep: "#00345b",
    secondary_color: "#eb7900",
    secondary_color_black: "#bd6203",
    tertiary_color: "#ffdd00",
    tertiary_color_black: "#ccb100",
    blue_dark: "#00345b",
    blue: "#254f9a",
    sky: "#69b9ec",
    blue_light: "#e4f0f9",
    magenta: "#cc518f",
    purple: "#8c125c",
    magenta_gray: "#c193b4",
    red: "#e11b22",
    orange: "#d06519",
    yellow: "#ffcc33",
    green: "#a1bf36",
    green_gray: "#bad483",
    teal: "#51acb8",
    white: "#ffffff",
    gray_extraLight: "#E6E6E6",
    gray_light: "#C6C6C6",
    gray_medium: "#878787",
    gray_dark: "#6E6E6E",
    gray_heavy: "#3b3b3b",
    black: "#000000",
    red_dark: "#b33040",
    red_orange: "#d25c4d",
    coral: "#FF7F50",
    yellow_orange: "#f2b447",
    yellow_green: "#d9d574",
    green1: "#1b9740",
    green2: "#1FAD4A",
    green3: "#9BCC3B",
    green4: "#D6E029",
    purple1: "#D73888",
    purple2: "#cc66cc",
    purple4: "#7f1b55",
    brown: "#c1baa9",
    blue1: "#3182bd",
    blue2: "#9c9ede",
    blue4: "#1a316b",
  };

  public sequentialReds = [
    "#43080a",
    "#871014",
    "#ca181e",
    "#e43138",
    "#ea5f64",
    "#f08d90",
    "#f6babc",
    "#fce8e8"
  ];
  public sequentialOranges = [
    "#FFEDA0",
    "#FED976",
    "#FEB24C",
    "#FD8D3C",
    "#FC4E2A",
    "#E31A1C",
    "#BD0026",
    "#800026",
  ];
  public sequentialGreens = [
    "#f7fcf5",
    "#e5f5e0",
    "#c7e9c0",
    "#a1d99b",
    "#74c476",
    "#41ab5d",
    "#238b45",
    "#005a32",
  ];
  public sequentialBlues = [
    "#002680",
    "#00489f",
    "#0068b6",
    "#0088c6",
    "#00a7d2",
    "#00c5da",
    "#65e2e3",
    "#a0ffed"
  ];
  public divergingRdYlGn = [
    "#d73027",
    "#f46d43",
    "#fdae61",
    "#fee08b",
    "#d9ef8b",
    "#a6d96a",
    "#66bd63",
    "#1a9850",
  ];
  public redToGreen = ['#ff0000', '#ffb200', '#00A100'];
}
