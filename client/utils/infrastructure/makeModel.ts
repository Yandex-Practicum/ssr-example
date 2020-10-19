import pathFromFunction from './pathFromFunctions';

export default function model<T>(
    path: (object?: T) => any,
    isRootPath?: boolean,
): string {
    const pathStr = pathFromFunction(path);

    if (!pathStr) {
        return pathStr;
    }

    return pathStr.startsWith('[') || isRootPath ? pathStr : `${pathStr}`;
}
