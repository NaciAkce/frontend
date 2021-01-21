import { URL } from 'url';

export function getPublicPath(isDev, homepage, publicUrl) {
    if (publicUrl) {
        publicUrl = publicUrl.endsWith('/')
            ? publicUrl
            : publicUrl + '/';

        const validatePublicUrl = new URL(publicUrl);
        console.log('validatePublicUrl', validatePublicUrl);
        console.log('publicUrl', publicUrl);

        return isDev
            ? publicUrl.startsWith('.')
                ? '/'
                : validatePublicUrl.pathname
            : publicUrl;
    }
    if (homepage) {
        // strip last slash if exists
        homepage = homepage.endsWith('/') ? homepage : homepage + '/';

        // validate if `homepage` is a URL or path like and use just pathname
        const validHomepagePathname = new URL(homepage).pathname;
        return isDev
            ? homepage.startsWith('.')
                ? '/'
                : validHomepagePathname
            : // Some apps do not use client-side routing with pushState.
            // For these, "homepage" can be set to "." to enable relative asset paths.
            homepage.startsWith('.')
            ? homepage
            : validHomepagePathname;
    }

    return '/';
}
