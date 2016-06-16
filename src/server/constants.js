
define('STATUS_SUCCESS', true);
define('STATUS_FAIL', false);

function define (name, value) {
    Object.defineProperty(module.exports, name, {
        value:        value,
        enumerable:   true,
        writable:     false,
        configurable: false
    });
};