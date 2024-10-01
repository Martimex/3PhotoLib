import { PrismaClient } from "@prisma/client";
import type PhotoResponseModel from "~/types/responseModel_photo";

// The use of this endpoint is described in detail inside PhotoItem Component

const prisma = new PrismaClient();

export default defineEventHandler(async(event) => {

    try {
        const reqBody = await readBody(event).then(data => { return { photosToRemoveArray: data.photosToRemoveArray as PhotoResponseModel[], userData: data.userData } });

        await prisma.user.update({
            where: { email: reqBody.userData.email.toLowerCase() },
            data: {
                likedPhotos: {
                    disconnect:  reqBody.photosToRemoveArray.map(item => item.photoId).map(el => { return { photoId: el}})
                }
            }
        })

    }

    catch(error) {
        throw new Error(`Failed attempt to delete selected photos. Full error message: ${error}`);
    }
})