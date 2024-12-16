export const getNavbarStyleClasses = function(navbarPositionShorthand: string): string {
    let navbarPositionClasses = getNavbarPositionClasses(navbarPositionShorthand);
    return 'left-0 right-0 backdrop-blur text-[#333] bg-[#fff5] py-5 mx-auto max-w-[1320px]' + ' ' + navbarPositionClasses;
}

function getNavbarPositionClasses(navbarPositionShorthand: string): string {
    if(navbarPositionShorthand === 't') return `top-0`;
    else if(navbarPositionShorthand === 'b') return `bottom-0`;
    return '';
}