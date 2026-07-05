import { GridBreakPoint, GridConfig } from "../types";
export declare type MediaQueryHelpers = {
    breakPointUp: (b: GridBreakPoint, s: string) => string;
    breakPointDown: (b: GridBreakPoint, s: string) => string;
};
export declare const getMediaQueryHelpers: (gridConfig: GridConfig) => MediaQueryHelpers;
