import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {

    const { transport } = useNodeMailer();

    const codeLength = 6;
    const customCode = Array.from(new Array(codeLength)).map((el, ind) => el = ind? `${Math.floor(Math.random() * 10)}` : `${Math.floor(Math.random() * 9) + 1}` ).join('');

    try {

        const reqBody = await readBody(event).then((data) => data.accountData);

        await prisma.user.update({
            where: { email: reqBody.email.toLowerCase() },
            data: {
                verifyCode: customCode,
                verifyRetryFrom: BigInt(0),
            }
        })

        await transport.sendMail({ 
            subject: `3PhotoLib - Verify your account`, 
            to: `${reqBody.email}`,
            html: `
                <div style="background:#eee;color:#222;border-radius:1rem;padding:2rem;">
                    <h1> Hello, ${reqBody.name} </h1>
                    <h3> To confirm your account, please write down below code in the verification form: </h3>
                    <div style="padding:0.5rem 1rem;border:.25rem solid #222;border-radius:5%;display:inline-block;margin-top:1.25rem;margin-bottom:1.75rem;">
                        <p style="font-size:1.5rem;font-weight:600;margin-inline:1rem;"> ${customCode} </p>
                    </div>
                    <h3 style="margin-bottom:-0.5rem;display:block;"> Happy browsing! <h3>
                    <br>
                    <h3 style="margin-top:-0.5rem;display:block;"> <b> 3PhotoLib </b> </h3>
                </div>
            `
        });

        return customCode;
    }
    catch(error) {
        throw new Error(`Failed atttempt to send a verification code. Please try again later. \n FULL ERROR MESSAGE: ${error}`);
    }
})