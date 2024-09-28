export default interface UnsplashPhoto {
    id: string,
    slug: string,
    alternative_slugs: {
        en: string,
        es: string,
        ja: string,
        fr: string,
        it: string,
        ko: string,
        de: string,
        pt: string
    },
    created_at: string,
    updated_at: string,
    promoted_at: string,
    width: number,
    height: number,
    color: string,
    blur_hash: string,
    description: string,
    alt_description: string,
    breadcrumbs: BreadCrumbs[],
    urls: {
        raw: string,
        full: string,
        regular: string,
        small: string,
        thumb: string,
        small_s3: string
    },
    links: {
        self: string,
        html: string,
        download: string,
        download_location: string,
    },
    likes: number,
    liked_by_user: boolean,
    current_user_collections: any[], // CHECK API RESPONSES TO MAKE SURE OF CORRECT TYPE
    sponsorship: null | {},   // CHECK API RESPONSES TO MAKE SURE OF CORRECT TYPE
    topic_submissions: { 
        [key: string]: { status: string, approved_on?: string }
    },
    asset_type: string,
    user: {
        id: string,
        updated_at: string,
        username: string,
        name: string,
        first_name: string,
        last_name: string,
        twitter_username: string | null,
        portfolio_url:  string | null,
        bio: string | null,
        location: string | null,
        links: {
            self: string,
            html: string,
            photos: string,
            likes: string,
            portfolio: string,
            following: string,
            followers: string
        },
        profile_image: {
            small: string,
            medium: string,
            large: string
        },
        instagram_username: string | null,
        total_collections: number,
        total_likes: number,
        total_photos: number,
        total_promoted_photos: number,
        total_promoted_illustrations: number,
        accepted_tos: boolean,
        for_hire: boolean,
        social: {
            instagram_username: string | null,
            portfolio_url: string | null,
            twitter_username: string | null,
            paypal_email: string | null,
        },
    },
    tags: Tag[],  // TAGS SEEMS TO BE REMOVED COMPLETELY BY UNSPLASH FROM THE API RESPONSE, SO THERE IS A BRIEF UPDATE NEEDED
}

type BreadCrumbs = {
    slug: string,
    title: string,
    index: number,
    type: string
}

type Tag = {
    type: string,
    title: string,
    source?: any, // This prop is very complex and yet unecessary for the app, therefore casted as "any" type
}