/**
 * Extract substrings from a string using a beginning and ending strings.
 * Example: const templates = extract([`<<${templateTag}`, '>>'])(html);
 *
 * @param beg The beginning of substrings
 * @param end The end of substrings
 * @returns {function(*): *} Returned matcher function
 */
export function extract([beg, end]) {
    const matcher = new RegExp(`${beg}(.*?)${end}`, 'gm');
    const normalise = (str) => str.slice(beg.length, end.length * -1);
    return function (str) {
        return str.match(matcher).map(normalise);
    };
}

/**
 * Calculate a percentage and format it using settings.
 *
 * @param  {String|Number} value
 */
export function formatPercentage(value) {
    const formattedVal = parseFloat(value);
    return `${+(formattedVal * 100).toFixed(2)}%`; // use +(number) to cast to a number and remove trailing zeroes
}

/**
 * Add a suffix or prefix to a string.
 *
 * @param input
 * @param affix
 * @param leading either true for prefix or false for suffix
 */
export function addAffix(input, affix, leading = false) {
    return leading ? `${affix}${input}` : `${input} ${affix}`;
}
