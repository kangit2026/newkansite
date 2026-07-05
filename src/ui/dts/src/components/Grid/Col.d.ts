import { FC, HTMLAttributes, ReactNode } from 'react';
export declare type BreakPointObject = {
    span?: number;
    start?: number;
    order?: number;
} | number;
export declare type ColProps = HTMLAttributes<HTMLDivElement> & {
    className?: string | object;
    children?: ReactNode;
    row?: number;
    xs?: BreakPointObject;
    sm?: BreakPointObject;
    md?: BreakPointObject;
    lg?: BreakPointObject;
    xl?: BreakPointObject;
    xxl?: BreakPointObject;
};
export declare const Col: FC<ColProps>;
