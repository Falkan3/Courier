/**
 * Extract substrings from a string using a beginning and ending strings.
 * Example: const templates = extract([`<<${templateTag}`, '>>'])(html);
 *
 * @param beg The beginning of substrings
 * @param end The end of substrings
 * @returns {function(*): *} Returned matcher function
 */
export default function extract([beg, end]) {
    const matcher = new RegExp(`${beg}(.*?)${end}`, 'gm');
    const normalise = (str) => str.slice(beg.length, end.length * -1);
    return function (str) {
        return str.match(matcher).map(normalise);
    };
}
