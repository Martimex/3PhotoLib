import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async(event) => {

    try {
        const reqBody = await readBody(event).then(data => { return { user: data.userData, photo: data.photoData, photoID: data.photoID, provider: data.provider } });

        // First check if the photo already exists in the database
        const requestedPhotoToLike = await prisma.photo.findUnique({
            where: { photoId: reqBody.photoID }
        }).then(data => data);

        if(!requestedPhotoToLike) {
            // This photo is not present in our DB yet. So let's add it
            const newPhoto = await prisma.photo.create({
                data: {
                    User: { connect: { id: reqBody.user.id } },
                    photoId: reqBody.photoID,
                    photoDetails: reqBody.photo,
                    provider: reqBody.provider
                }
            });

            if(!newPhoto) throw new Error(`Failed attempt to create a new photo item.`);

        } else {

            const photoToUpdate = await prisma.user.update({
                where: { email: reqBody.user.email.toLowerCase() },
                data: { likedPhotos: { connect: { photoId: reqBody.photoID } } }
            });

            if(!photoToUpdate) throw new Error(`Failed attempt to update a photo.`);
        }

    }

    catch(error) {
        throw new Error(`Failed attempt to like a photo. Full error message: ${error}`);
    }
})