import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {

    try {

        const reqBody = await readBody(event).then((data) => data.accountData);
        await prisma.user.update({
            where: { email: reqBody.email },
            data: { isVerified: true }
        });

    }
    catch(error) {
        throw new Error(`Failed attempt to verify this account. \n FULL ERROR MESSAGE: ${error}`);
    }
})