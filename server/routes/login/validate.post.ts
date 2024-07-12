import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {

    try {

        const reqBody = await readBody(event).then((data) => data.formData);

        const isAccountFound = await prisma.user.findUnique({
            where: {
                email: reqBody.form_email.toLowerCase(),
                password: reqBody.form_password
            }
        });
        
        console.log('isAccountFound: ', isAccountFound);

        // Return the value for if we found anything based on provided credetials
        if(isAccountFound) {
            return isAccountFound.isVerified? true : isAccountFound.name;
        }
        return false;
    }
    catch(error) {
        throw new Error(`Account login attempt has failed. \n FULL ERROR MESSAGE: ${error}`);
    }
})