import {
    EVAL,
    INLINE,
    NONE,
    SELF,
    CSPDirectives,
} from 'csp-header';

const policies: CSPDirectives = {
    'connect-src': [
        SELF,
    ],
    'default-src': [
        NONE,
    ],
    'script-src': [
        EVAL,
        INLINE,
        '%nonce%',
    ],
    'style-src': [
        INLINE,
    ],
    'img-src': [
        SELF,
        INLINE,
    ],
};

export default policies;
