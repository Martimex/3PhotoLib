import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {

    try {

        const reqBody = await readBody(event).then((data) => data.formData);

        // Is username taken ?
        const isUsernameTaken = await prisma.user.findMany({
            where: { 
                name: {
                    equals: reqBody.form_username,
                    mode: 'insensitive'
                }
            },
        });

        if(isUsernameTaken.length) { return 'username'; }

        // Is e-mail taken ?

        const isEmailTaken = await prisma.user.findUnique({
            where: { email: reqBody.form_email.toLowerCase() }
        });

        if(isEmailTaken) { return 'email'; }

        // Both name and e-mail are unique. Proceed creating an account
        
        return true;

    }
    catch(error) {
        throw new Error(`Failed atttempt to check credential uniqueness. \n FULL ERROR MESSAGE: ${error}`);
    }
})