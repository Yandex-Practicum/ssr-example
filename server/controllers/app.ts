import {Request, Response} from 'express';

import cfg from 'client/config/config';

const RTC_ENV = process.env.RTC_ENV || cfg.__DEV__;

export default function renderApp(req: Request, res: Response) {
    const resHeaders = res.getHeaders();
    // req.tld!
    const faviconLang = ['com', 'com.tr'].includes('ru')
        ? 'en'
        : 'ru';
    const {
        ip,
        nonce,
    } = req;

    res.renderBundle('desktop', {
        faviconLang,
        ip,
        nonce,
        resHeaders,
        appEnv: RTC_ENV,
    });
}
