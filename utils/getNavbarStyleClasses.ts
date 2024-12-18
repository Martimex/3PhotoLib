export const getNavbarStyleClasses = function(navbarPositionShorthand: string, disableBackdropBlur: boolean = false): string {
    let navbarPositionClasses = getNavbarPositionClasses(navbarPositionShorthand);
    return 'left-0 right-0 text-[#333] mx-auto max-w-[1320px]' 
        + ' ' + (disableBackdropBlur === false && `backdrop-blur bg-[#fff5] py-5 lg:py-8`)
        + ' ' + navbarPositionClasses;
}

function getNavbarPositionClasses(navbarPositionShorthand: string): string {
    if(navbarPositionShorthand === 't') return `top-0`;
    else if(navbarPositionShorthand === 'b') return `bottom-0`;
    return '';
}