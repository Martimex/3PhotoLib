export default defineNuxtRouteMiddleware(async(to, from) => {

    // This fetch process is actually helpful, when user likes some photos and right after (not switching routes) he wants to unlike one.
    // This middleware helps deal with keeping likedPhotos up to date and to avoid some mismatches inside /liked UI.

    console.log('EIJPGTEIJIPJGIPJIPJGPIEGIPJEIPRGEIJPG')
    // First get the user data, then perform the database query
    const { currentUser_get, likedPhotos_set } = useAuthStore();
    
    const currentUserEmail = currentUser_get()?.email;

    if(currentUserEmail) {

        const data =  await $fetch('/account/getData', { method: 'post'});
        if(data) {
            // Setting as any[] because we take data from db where we are sure that every parts meets the type-checking criteria
            likedPhotos_set(data.likedPhotos as any[]) 
        }

    } else throwError(409, 'Cannot find user data to perform the account data update.')


    function throwError(errorNo: number, info?: string) {
        throw createError({
            statusCode: errorNo,
            statusMessage: info    
        });
    }

});
