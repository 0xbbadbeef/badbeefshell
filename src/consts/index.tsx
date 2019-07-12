const USER_STRING = (path?: string) => `root@0xbbadbeef:~${path || ''}#`;

const KEYS = {
    ENTER_KEY: 0x0D,
    BACKSPACE_KEY: 0x8,
    SPACE_KEY: 0x20,
    A_KEY: 0x41,
    Z_KEY: 0x5A,
    ZERO_KEY: 0x30,
    NINE_KEY: 0x39,
}

export {
    USER_STRING,
    KEYS,
}