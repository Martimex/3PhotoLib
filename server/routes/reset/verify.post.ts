import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {

    const { transport } = useNodeMailer();

    try {

        const codeLength = 6;
        const customCode = Array.from(new Array(codeLength)).map((el, ind) => el = ind? `${Math.floor(Math.random() * 10)}` : `${Math.floor(Math.random() * 9) + 1}` ).join('');
        
        const reqBody = await readBody(event).then((data) => { return { account: data.accountData, misc: data.miscData }});

        const lastVerification_date = await prisma.user.findUnique({
            where: { email: reqBody.account.email.toLowerCase() },
            select: { verifyRetryFrom: true }
        }).then(data => (data !== null)? data.verifyRetryFrom : 0);

        if(typeof lastVerification_date !== 'bigint' ) { throw new Error('[FAILURE::] Last verification date is not a big integer type!')}

        // Check if 12 hours elapsed between subsequent "verification-retry" calls
        const time_now = new Date().getTime();
        const remainCooldownHours = reqBody.misc.requiredElapseHours - Math.floor((time_now - Number(lastVerification_date)) / (1000 * 60 * 60));

        if(remainCooldownHours <= 0) {
            await prisma.user.update({
                where: { email: reqBody.account.email.toLowerCase() },
                data: {
                    verifyCode: customCode,
                    verifyRetryFrom:  BigInt(time_now),
                }
            })

            await transport.sendMail({ 
                subject: `3PhotoLib - Reset account password`, 
                to: `${reqBody.account.email.toLowerCase()}`,
                html: `
                    <div style="background:#eee;color:#222;border-radius:1rem;padding:2rem;">
                        <h1> Hello, </h1>
                        <h3> To reset your account password, please write down below code in the verification form: </h3>
                        <div style="padding:0.5rem 1rem;border:.25rem solid #222;border-radius:5%;display:inline-block;margin-top:1.25rem;margin-bottom:1.75rem;">
                            <p style="font-size:1.5rem;font-weight:600;margin-inline:1rem;"> ${customCode} </p>
                        </div>
                        <h3 style="margin-bottom:-0.5rem;display:block;"> Happy browsing! <h3>
                        <br>
                        <h3 style="margin-top:-0.5rem;display:block;"> <b> 3PhotoLib </b> </h3>
                    </div>
                `
            });

            // Success
            return customCode;
        }

        // Failure - 'Insufficient elapsed time between subsequent "verification-retry" calls.'
        return remainCooldownHours;
    }
    catch(error) {
        throw new Error(`Failed atttempt to send a verification code. Please try again later. \n FULL ERROR MESSAGE: ${error}`);
    }
})