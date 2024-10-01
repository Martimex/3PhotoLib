import { PrismaClient } from "@prisma/client";
import { collectionDetailsObject } from "~/types/responseModel_collection";

const prisma = new PrismaClient();

export default defineEventHandler(async(event) => {

    try {
        const reqBody = await readBody(event).then(data => { return { name: data.name, description: data.description, folderColor: data.folderColor, releaseId: data.releaseId, currentUser: data.currentUser } });

        const newCollection = await prisma.collection.update({
            where: { userId: reqBody.currentUser.id, releaseId: reqBody.releaseId },
            include: { collectionPhotos: true },
            data: {
                name: reqBody.name,
                description: reqBody.description,
                folderColor: reqBody.folderColor,
            }
        });

        return newCollection;
    }

    catch(error) {
        throw new Error(`Failed attempt to update an existing collection. Full error message: ${error}`);
    }
})