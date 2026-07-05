import { FC, HTMLAttributes, ReactNode } from 'react';
export declare type GridProps = HTMLAttributes<HTMLDivElement> & {
    className?: string | object;
    children?: ReactNode;
};
export declare const Grid: FC<GridProps>;
