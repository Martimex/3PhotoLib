export default defineNuxtRouteMiddleware(async(to, from) => {

    const { isAuthenticated_get, isAuthenticated_set, currentUser_set } = useAuthStore();
    const sStore = useStatusStore();

    // First, let's check if session is active 

    const isSession = isAuthenticated_get();

    if(isSession) return;

    // If it is not, let's try to find a cookie that will look for ongoing session and also bring some user data
    const isSessionFound = await handleGetUserData();

    if(isSessionFound) return;

    // if token doesn't exist redirect to log in
    if(!isSession && to?.path !== '/') {
        abortNavigation();
        sStore.currentHomePageView = 'login';
        return navigateTo('/');
    }

    // HELPER FUNCTIONS

    async function handleGetUserData(): Promise<boolean> {
        const accountData = await getUserAccountData();

        // In case we found user data
        if(accountData) {
            currentUser_set(accountData.id, accountData.name, accountData.email, accountData.profile_image, accountData.member_since, accountData.likedPhotos, accountData.collections);
            isAuthenticated_set(true);
        }

        return Boolean(accountData);
    }

    async function getUserAccountData() {
        const data =  await $fetch('/account/getData', { method: 'post'});
        return Promise.resolve(data);
    }
});