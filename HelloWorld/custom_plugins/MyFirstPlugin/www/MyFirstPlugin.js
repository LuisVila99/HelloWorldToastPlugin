var exec = require('cordova/exec');
exports.nativeToast = function (arg0, success, error) {
    exec(success, error, 'MyFirstPlugin', 'nativeToast', [arg0]);
};
