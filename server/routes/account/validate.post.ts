import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {


    try {

        const reqBody = await readBody(event).then((data) => data.accountData);
        const currentUser = await prisma.user.findUnique({
            where: { email: reqBody.email },
            select: { verifyCode: true }
        });

        if(!currentUser) { throw new Error('[ERROR:: ] User not found by the provided e-mail')}

        return Boolean(currentUser.verifyCode === reqBody.verifyCode_attempt);

    }
    catch(error) {
        throw new Error(`Failed atttempt to send a verification code. Please try again later. \n FULL ERROR MESSAGE: ${error}`);
    }
})