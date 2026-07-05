import { FC, HTMLAttributes, ReactNode } from 'react';
export declare type LinkProps = HTMLAttributes<HTMLElement> & {
    className?: string | object;
    to?: string;
    external?: boolean;
    disabled?: boolean;
    children?: ReactNode;
};
export declare const Link: FC<LinkProps>;
