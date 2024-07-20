import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {

    try {

        const reqBody = await readBody(event).then((data) => data.formData);
        const currentUser = await prisma.user.findUnique({
            where: { email: reqBody.email.toLowerCase() },
        });

        if(currentUser === undefined) throw new Error('[ERROR::: ] Current user is not defined');

        return currentUser?.isVerified;

    }
    catch(error) {
        throw new Error(`E-mail existence check failed. Please try again later. \n FULL ERROR MESSAGE: ${error}`);
    }
})