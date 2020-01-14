module.exports = function formatErrorOnConsole(file, func, error) {
    console.log(`======== Start of Error on ${file} => ${func}. ========`)
    console.log(error)
    console.log(`======== End of Error on ${file} => ${func}.   ========`)
}