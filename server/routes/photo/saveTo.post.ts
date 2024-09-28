import { PrismaClient } from "@prisma/client";
import type CollectionResponseModel from "~/types/responseModel_collection";

const prisma = new PrismaClient();

export default defineEventHandler(async(event) => {

    try {

        const reqBody = await readBody(event).then(data => { return { collectionsToAddPhoto: data.collections as CollectionResponseModel[], photoID: data.photoID, photoData: data.photoData, provider: data.provider } });

        // First check if the photo is in the database
        const isPhotoAlreadyCreated = await prisma.photo.findUnique({
            where: { photoId: reqBody.photoID }
        })

        if(!isPhotoAlreadyCreated) {
            const newPhoto = await prisma.photo.create({
                data: {
                    photoId: reqBody.photoID,
                    photoDetails: reqBody.photoData,
                    provider: reqBody.provider,
                    Collection: {
                        connect: reqBody.collectionsToAddPhoto.map(collection => collection.releaseId).map(id => { return { releaseId: id }})
                    }
                }
            })
            return newPhoto;
        } else {
            const updatedPhoto = await prisma.photo.update({
                where: { photoId: reqBody.photoID },
                data: {
                    Collection: {
                        connect: reqBody.collectionsToAddPhoto.map(collection => collection.releaseId).map(id => { return { releaseId: id }})
                    }
                }
            })
            return updatedPhoto;
        }
    }

    catch(error) {
        throw new Error(`Failed attempt to save selected photo to collection(-s). Full error message: ${error}`);
    }
})