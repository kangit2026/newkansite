export declare type ThemeProp = {
    theme: ThemeConfig | ThemeOptions;
};
export declare type ThemeOptions = {
    [key: string]: any;
};
export declare type ThemeConfig = {
    colors: {
        [theme: string]: ThemeOptions;
    };
    typography: {
        weights?: ThemeOptions;
        sizes?: ThemeOptions;
    };
    [key: string]: ThemeOptions;
};
export declare enum ThemeMode {
    Light = "light",
    Dark = "dark"
}
export declare const defaultThemeConfig: ThemeConfig;
