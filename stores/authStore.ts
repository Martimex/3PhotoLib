import type { userData } from "~/types/type_utilities";

export const useAuthStore = defineStore('auth', () => {

    const isAuthenticated = ref<boolean>(false);
    const currentUser = ref<null | userData>(null); 
    
    // We will store a copy of cookie value in case when user manually changes the cookie. In crucial parts there will be performed
    // a check if cookie value equals this varaible value. If they mismatch or cookie is not present (user deletes it), user will be
    // redirected to the Login Page regardless
    //const sessionCurrentUser: string = '';

    function isAuthenticated_get(): boolean {
        return isAuthenticated.value;
    }

    function isAuthenticated_set(val: boolean): void {
        isAuthenticated.value = val;
    }

    function currentUser_get(): userData | null {
        return currentUser.value;
    }

    function currentUser_set(name: string, email: string, profileImage: string, memberSince: string, likedPhotos: any, collections: any): void {
        currentUser.value = {
            name,
            email,
            profileImage,
            memberSince,
            likedPhotos,
            collections
        }
    }

    function currentUser_clear() {
        currentUser.value = null;
    }

    function authenticateUser(name: string) {
        //currentUser.value = name;
        isAuthenticated.value = true;
    };

    return { isAuthenticated_get, isAuthenticated_set, currentUser_get, currentUser_set, currentUser_clear,  authenticateUser };
})