import React, { FC } from 'react';
import { ThemeOptions, ThemeConfig, ThemeMode } from '@utils/constants';
export declare type ThemeContextProps = {
    theme: ThemeConfig | ThemeOptions;
    mode: ThemeMode;
    setMode: (theme: ThemeMode) => void;
};
export declare const ThemeContext: React.Context<ThemeContextProps>;
export declare type ThemeProviderProps = {
    children: React.ReactNode;
    theme?: ThemeConfig;
    mode?: ThemeMode;
};
export declare const ThemeProvider: FC<ThemeProviderProps>;
