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
            include: {
                likedPhotos: true,
                collections: true
            }
        }).then(res => { 
            if(!res) { return null; }
            return { id: res.id, name: res.name, email: res.email, profile_image: res.profile_image, member_since: res.member_since, likedPhotos: res.likedPhotos, collections: res.collections };
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