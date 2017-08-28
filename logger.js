function writeLog(text, success) {
    if (!success) {
        console.error(text);
    } else {
        console.log(text);
    }
}

module.exports = writeLog;
// export {writeLog}; // typescript