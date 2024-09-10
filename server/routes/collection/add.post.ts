import { PrismaClient } from "@prisma/client";
import { collectionDetailsObject } from "~/types/responseModel_collection";

const prisma = new PrismaClient();

export default defineEventHandler(async(event) => {

    try {
        const reqBody = await readBody(event).then(data => { return { name: data.name, description: data.description, folderColor: data.folderColor, currentUser: data.currentUser } });

        const date_now = new Date().toLocaleDateString(); 

        const newCollection = await prisma.collection.create({
            data: {
                User: { connect: { id: reqBody.currentUser.id } },
                name: reqBody.name,
                description: reqBody.description,
                folderColor: reqBody.folderColor,
                collectionDetails: {
                    createdAt: date_now
                } as collectionDetailsObject,
            }
        });

        return newCollection;
    }

    catch(error) {
        throw new Error(`Failed attempt to create a new collection. Full error message: ${error}`);
    }
})