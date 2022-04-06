import { Injectable } from "@angular/core";
import * as d3 from "d3";

export interface Dimension {
    width: number;
    height: number;
}
export interface Margin {
    top: number;
    right: number;
    bottom: number;
    left: number;
    middle?: number;
}

@Injectable()
export class DimensionsService {
    public getDimensions = (
        svg: any,
        selector: string,
        margin: Margin
    ): Dimension => {
        try {
            if (svg && selector && margin) {
                // Reset the svg dimensions
                svg.attr("width", 0).attr("height", 0);
                const container = d3.select(selector);
                // Get the new dimensions
                if (container !== null) {
                    const containerWidth: number = parseInt(container.style("width"), 10);
                    const containerHeight: number = parseInt(
                        container.style("height"),
                        10
                    );
                    const width: number = containerWidth - margin.left - margin.right;
                    const height: number = containerHeight - margin.top - margin.bottom;
                    return { width: width, height: height };
                }
            }
        } catch (e) {
            return { width: 450, height: 400 };
        }
        return { width: 450, height: 400 };
    };

}
