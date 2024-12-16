import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "~/tailwind.config";
import type { screenSizes } from "~/types/type_utilities";

const theConfig = resolveConfig(tailwindConfig);
const configSizesCopy = {...theConfig.theme.screens} as { [key in keyof screenSizes | string]: number | string };

const configSizesAsNumbers = Object.keys(configSizesCopy).reduce((acc, key: string) => {acc[key] = parseInt(`${configSizesCopy[key]}`); return acc; }, {} as { [key: string]: number });
const configSizesAsNumbers_sortedArr = Object.entries(configSizesAsNumbers).toSorted((a, b) => a[1] - b[1]) as [keyof screenSizes, number][];

export const getCurrentBreakpointName = function(screenWidth: number): keyof screenSizes { 
    let currentBreakpoint: keyof screenSizes = configSizesAsNumbers_sortedArr[0][0];
    for(let i=0; i<configSizesAsNumbers_sortedArr.length; i++) {
        const [breakpointName, breakpointMinWidth] = configSizesAsNumbers_sortedArr[i];
        if(screenWidth >  breakpointMinWidth) currentBreakpoint = breakpointName;
        else break;
    }
    return currentBreakpoint; 
}