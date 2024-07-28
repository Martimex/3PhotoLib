import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {

    try {

        // const reqBody = await readBody(event).then((data) => data.cookie);
        const cookies = parseCookies(event);
        const token = cookies?.token;

        if(!token) { return null; }

        const theUser = await prisma.user.findUnique({
            where: { id: token },
        }).then(res => { 
            if(!res) { return null; }
            return { name: res.name, email: res.email, profile_image: res.profile_image, member_since: res.member_since };
        });

        if(!theUser) { 
            // Cookie value might be corrupted / manually changed by a user! Destroy a cookie.
            deleteCookie(event, 'token');
        }

        return theUser;
    }
    catch(error) {
        throw new Error(`[MIDDLEWARE:: ] ERROR WHILE TRYING TO OBTAIN USER DATA. \n FULL ERROR MESSAGE: ${error}`);
    }
})