import { PrismaClient } from "@prisma/client";
import { collectionDetailsObject } from "~/types/responseModel_collection";

const prisma = new PrismaClient();

export default defineEventHandler(async(event) => {

    try {
        const reqBody = await readBody(event).then(data => { return { userData: data.userData, collectionID: data.collectionID } });

        await prisma.collection.delete({
            where: { userId: reqBody.userData.id, releaseId: reqBody.collectionID }
        });
    }

    catch(error) {
        throw new Error(`Failed attempt to delete user collection. Full error message: ${error}`);
    }
})