import { PrismaClient } from "@prisma/client";
import type CollectionResponseModel from "~/types/responseModel_collection";

const prisma = new PrismaClient();

export default defineEventHandler(async(event) => {

    // Very similiar to "saveTo", but with an extra step of removing photo from moveFrom collection

    try {

        const reqBody = await readBody(event).then(data => { return { collectionsToAddPhoto: data.collectionsToAddImage as CollectionResponseModel[], collectionToRemovePhoto: data.collectionToRemoveImage as CollectionResponseModel, photoID: data.photoID, photoData: data.photoData, provider: data.provider } });

        // MoveTo occurs on photos that are already inside collections, so no need to perform db checks if photo already exist - it is certain
    
        const updatedPhoto = await prisma.photo.update({
            where: { photoId: reqBody.photoID },
            data: {
                Collection: {
                    connect: reqBody.collectionsToAddPhoto.map(collection => collection.releaseId).map(id => { return { releaseId: id }}),
                    disconnect: { releaseId: reqBody.collectionToRemovePhoto.releaseId }
                }
            }
        })
        return updatedPhoto;
    }

    catch(error) {
        throw new Error(`Failed attempt to save selected photo to collection(-s). Full error message: ${error}`);
    }
})