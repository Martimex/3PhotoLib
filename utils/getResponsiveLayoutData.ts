import type { screenBreakpointsObj } from "~/types/type_utilities"
// Based on which breakpoint is triggered, this dataset determines how many columns grid should contain

export const responsiveLayoutData: screenBreakpointsObj = {
    xs: {
        grid: { columns: 1 },
        panels: { disableBottomPanels: false },
    },
    sm: {
        grid: { columns: 2 },
        panels: { disableBottomPanels: true },
    },
    md: {
        grid: { columns: 2 },
        panels: { disableBottomPanels: true },
    },
    lg: {
        grid: { columns: 3 },
        panels: { disableBottomPanels: true },
    },
    xl: {
        grid: { columns: 3 },
        panels: { disableBottomPanels: true },
    },
    "2xl": {
        grid: { columns: 3 },
        panels: { disableBottomPanels: true },
    }
}