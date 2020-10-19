import {CSPDirectives} from 'csp-header';

const policies: CSPDirectives = {
    'connect-src': ['mc.yandex.ru'],
    'img-src': ['mc.yandex.ru'],
    'script-src': ['mc.yandex.ru'],
};

export default policies;
