import type { screenSizes } from "~/types/type_utilities";

export const testTeleportConditions = function(currentBreakpoint: keyof screenSizes, isTeleportReady: boolean) {
    if(!responsiveLayoutData[currentBreakpoint].panels.disableBottomPanels) return false;
    if(!isTeleportReady) return false;
    return true;
}