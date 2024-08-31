import { PrismaClient } from "@prisma/client";

// The use of this endpoint is described in detail inside PhotoItem Component

const prisma = new PrismaClient();

export default defineEventHandler(async(event) => {

    try {
        const reqBody = await readBody(event).then(data => { return { photoData: data.photoData, photoID: data.photoID } });

        const updatedImage = await prisma.photo.update({
            where: { photoId: reqBody.photoID },
            data: { photoDetails: reqBody.photoData }
        });

        if(!updatedImage) { throw new Error(`Photo to update not found!`); }

    }

    catch(error) {
        throw new Error(`Failed attempt to refresh outdated photo details. Full error message: ${error}`);
    }
})