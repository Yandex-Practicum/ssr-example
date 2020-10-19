import flowRight from 'lodash/flowRight';
import last from 'lodash/last';

const DEFAULT_PROXY_OPTIONS = {
    has() {
        throw new Error('Функция пути не должна содержать обращение к аргументу через оператор in');
    },
};

function collect(arr: string[][]) {
    return () => {
        return new Proxy(
            Object.create(null),
            {
                get(_: unknown, prop: string) {
                    const currentArr: string[] = [];
                    arr.push(currentArr);
                    currentArr.push(prop);
                    const childProxy: ProxyHandler<{}> = new Proxy(
                        Object.create(null),
                        {
                            get(_: unknown, childProp: string) {
                                currentArr.push(childProp);
                                return childProxy;
                            },
                            ...DEFAULT_PROXY_OPTIONS,
                        });
                    return childProxy;
                },
                ...DEFAULT_PROXY_OPTIONS,
            });
    };
}

function pathToString(arr: string[]) {
    return arr.reduce((result, item) => {
        const prefix = result === '' ? '' : '.';
        return result + (isNaN(Number(item)) ? prefix + item : `[${item}]`);
    }, '');
}

export default function pathFromFunction<T, R>(path: (object?: T) => R): string {
    const arr: string[][] = [[]];
    const resultProxy = flowRight([path, collect(arr)])();
    if (!resultProxy) {
        throw new Error('В функции пути нет return');
    }
    if (arr.length > 2) {
        throw new Error(
            `В функции пути присутствуют ненужные обращения к свойствам аргумента
        или сам аргумент используется в вычислениях свойства аргумента`,
        );
    }
    return pathToString(last(arr) || []);
}
