import last from 'lodash/last';

export function addLastSlash(url: string): string {
    if (last(url) !== '/') {
        return `${url}/`;
    }

    return url;
}
