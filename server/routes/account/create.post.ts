import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {


    try {

        const reqBody = await readBody(event).then((data) => data.formData);
        await prisma.user.create({
            data: {
                email: reqBody.email.toLowerCase(),
                name: reqBody.username,
                password: reqBody.password,
                profile_image: '',
                member_since: new Date(),
                verifyRetryFrom: BigInt(0),
            }
        })

        return Promise.resolve();
    }
    catch(error) {
        throw new Error(`Failed atttempt to send a verification code. Please try again later. \n FULL ERROR MESSAGE: ${error}`);
    }
})