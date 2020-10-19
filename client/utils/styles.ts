export function makeBem(block: string, element?: string, modify?: string): string {
    let result = block;

    if (element) {
        result = `${result}__${element}`;
    }

    if (modify) {
        result = `${result}_${modify}`;
    }

    return result;
}
