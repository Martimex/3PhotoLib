import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {

    try {

        const reqBody = await readBody(event).then(data => { return { collectionID: data.collectionID, userID: data.userID } } );

        const requestedCollection = await prisma.collection.findUnique({
            where: { releaseId: parseInt(reqBody.collectionID), userId: reqBody.userID }
        });

        if(!requestedCollection) { throw new Error('[MIDDLEWARE:: ] ERROR - Requested collection is not found') }

        return requestedCollection;
    }
    catch(error) {
        throw new Error(`[MIDDLEWARE:: ] ERROR WHILE TRYING TO OBTAIN COLLECTION DATA. \n FULL ERROR MESSAGE: ${error}`);
    }
})