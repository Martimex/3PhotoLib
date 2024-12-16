import type { screenBreakpointsObj } from "~/types/type_utilities"
// Based on which breakpoint is triggered, this dataset determines how many columns grid should contain

export const gridLayoutData: screenBreakpointsObj = {
    xs: {
        columns: 1,
    },
    sm: {
        columns: 2,
    },
    md: {
        columns: 2,
    },
    lg: {
        columns: 3,
    },
    xl: {
        columns: 3,
    },
    "2xl": {
        columns: 3,
    }
}