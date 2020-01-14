module.exports = function parseStringAsArray(string) {
    return string.split(',').map(string => string.trim())
}