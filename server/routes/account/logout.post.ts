
export default defineEventHandler(async (event) => {

    try {

        const cookies = parseCookies(event);
        const token = cookies?.token;

        if(token) { deleteCookie(event, 'token'); }
        else { throw new Error('[LOGOUT:::] Session token is not found!'); }

    }
    catch(error) {
        throw new Error(`[MIDDLEWARE:: ] ERROR WHILE TRYING TO OBTAIN USER DATA. \n FULL ERROR MESSAGE: ${error}`);
    }
})