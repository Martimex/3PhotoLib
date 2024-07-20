import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {

    try {

        const reqBody = await readBody(event).then((data) => { return { account: data.accountData, misc: data.miscData } });
        await prisma.user.update({
            where: { email: reqBody.account.email.toLowerCase() },
            data: { password: reqBody.misc.password_new }
        });
    }
    catch(error) {
        throw new Error(`Failed attempt to change password for this account. \n FULL ERROR MESSAGE: ${error}`);
    }
})