import type { screenSizes } from "~/types/type_utilities";
import { responsiveLayoutData } from "#imports";

export const getNavbarPositionClass = function(currentBreakpoint: keyof screenSizes): 'sticky' | 'fixed' {
    if(responsiveLayoutData[currentBreakpoint].panels.disableBottomPanels) { return `sticky`; }
    return `fixed`;
}