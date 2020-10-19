import {Request, Response, NextFunction} from 'express';
import {isNil} from 'lodash';

export interface Rule<K, V> {
    key: K;
    required?: boolean;
    validator?<T>(value: T | V): boolean;
}
export type Rules<K, V> = Rule<K, V>[];

export function validateBodyKeys<T extends object>(rules: Rules<keyof T, T[keyof T]> = []) {
    return ({body}: Request, response: Response, next: NextFunction) => {
        try {
            for (const {key, validator, required} of rules) {
                const value = body[key];

                if (required && isNil(value)) {
                    throw `${key} is empty, but required`;
                }

                if (validator && !validator(value)) {
                    throw `${key} is not valid`;
                }
            }

            next();
        } catch (reason) {
            response.status(400).send({error: 'bad format', reason});
        }
    };
}
