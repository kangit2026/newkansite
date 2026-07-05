export declare type GridBreakPoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
export declare type GridColumns = {
    [breakPoint in GridBreakPoint]?: number;
} | number;
export declare type GridGutters = {
    [breakPoint in GridBreakPoint]?: number;
} | number;
export declare type GridBreakPoints = {
    [breakPoint in GridBreakPoint]?: number;
};
export declare type GridContainerWidths = {
    [breakPoint in GridBreakPoint]?: number | string;
};
export declare type GridBreakPointsOrder = GridBreakPoint[];
export declare type GridConfig = {
    columns: GridColumns;
    breakPointsOrder?: GridBreakPointsOrder;
    gutters: GridGutters;
    breakPoints: GridBreakPoints;
    containerWidths: GridContainerWidths;
};
