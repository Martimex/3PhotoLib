import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {

    try {

        const reqBody = await readBody(event).then((data) => data.accountData);
        const user = await prisma.user.update({
            where: { email: reqBody.email.toLowerCase() },
            data: { isVerified: true }
        });

        // Last of all, set the cookie and further create a cookie session for newly verified accout
        setCookie(event, 'token', user.id, { maxAge: (86400 * 7), httpOnly: true, secure: true, sameSite: 'strict' });

    }
    catch(error) {
        throw new Error(`Failed attempt to verify this account. \n FULL ERROR MESSAGE: ${error}`);
    }
})