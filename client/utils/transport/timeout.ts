export function promiseTimeout<Result>(ms: number, promise: Promise<any>): Promise<Result> {
    const requests = [
        promise,
        new Promise<Result>((_, reject) => {
            setTimeout(() => reject(new Error('Timeout error')), ms);
        }),
    ];

    return Promise.race(requests);
}
