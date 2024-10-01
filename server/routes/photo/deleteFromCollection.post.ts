import { PrismaClient } from "@prisma/client";
import type PhotoResponseModel from "~/types/responseModel_photo";

const prisma = new PrismaClient();

export default defineEventHandler(async(event) => {

    try {
        const reqBody = await readBody(event).then(data => { return { photosToRemoveArray: data.photosToRemoveArray as PhotoResponseModel[], collectionID: data.collectionID } });

        await prisma.collection.update({
            where: { releaseId: reqBody.collectionID },
            data: {
                collectionPhotos: {
                    disconnect:  reqBody.photosToRemoveArray.map(item => item.photoId).map(el => { return { photoId: el}})
                }
            }
        })

    }

    catch(error) {
        throw new Error(`Failed attempt to delete selected photos. Full error message: ${error}`);
    }
})