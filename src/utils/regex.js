/**
 * match end of string dots and non alphanumeric characters
 */
function suffix_regex(str) {
    let suffix_regex = /(\s|\W|_|\.)*(\n|$)/g
    res = str.replace(suffix_regex, '')
    return res;
}
/**
 * match begin of string non alphanumeric characters
 */

// let str = " -=  '  p?!RegExr hosted by Media Temple?..לדססדג"
// let pattern_begin_of_str = /^[\s|\W|_]*/g
// let res = str.replace(pattern_begin_of_str, '')

function prefix_regex(str) {
    let prefix_regex = /^[\s|\W|_]*/g;
    let res = str.replace(prefix_regex, '')
    return res;
}

/**
 * Detect string which contains only spaces
 */
function str_is_spaces(str) {

    if (str.replace(/\s/g, '').length) {
        //console.log('string only contains whitespace (ie. spaces, tabs or line breaks)');
        return res;
    }
    
}

/**
 * match the end of string is question mark or space
 */
let reg = /[\s|\?]+$/



module.exports = {
    prefix_regex,
    suffix_regex,
    str_is_spaces
}