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
    return function matchFn(str) {
        return str.match(matcher).map(normalise);
    };
}

export function roundNumber(value, decimalPlaces = 2) {
    const factorOfTen = 10 ** (decimalPlaces);
    return +(Math.round((value + Number.EPSILON) * factorOfTen) / factorOfTen)
    .toFixed(decimalPlaces); // use +(number) to cast to a number and remove trailing zeroes
}

/**
 * Calculate a percentage and format it using settings.
 *
 * @param  {String|Number} value
 * @param addPercent
 */
export function formatPercentage(value, addPercent = true) {
    const formattedVal = parseFloat(value);
    const percentVal = roundNumber(formattedVal * 100);
    return addPercent ? `${percentVal}%` : percentVal;
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

/**
 * Return formatted number in the specified format
 * Taken from YUI codebase https://yuilibrary.com/
 *
 * @param data
 * @param options
 * @returns {string|*}
 */
export function formatNumber(data, options = {}) {
    const defaults = {
        decimalPlaces: null,
        addMissingZeroes: false,
        decimalSeparator: '.',
        thousandsSeparator: ' ',
        prefix: null,
        suffix: null,
    };
    const config = { ...defaults, ...options };

    // Cast number variable to a numeric type
    if (Number.isNaN(data)) {
        data *= 1;
    }

    if (!Number.isNaN(data)) {
        let sOutput = `${data}`;
        const sDecimalSeparator = config.decimalSeparator;
        let nDotIndex;

        // Manage decimals
        if (!Number.isNaN(config.decimalPlaces)) {
            // Round to the correct decimal place
            const nDecimalPlaces = config.decimalPlaces;
            const nDecimal = 10 ** nDecimalPlaces;
            sOutput = `${Math.round(data * nDecimal) / nDecimal}`;
            nDotIndex = sOutput.lastIndexOf('.');

            if (nDecimalPlaces > 0) {
                // Add the decimal separator
                if (config.addMissingZeroes) {
                    if (nDotIndex < 0) {
                        sOutput += sDecimalSeparator;
                        nDotIndex = sOutput.length - 1;
                    }
                }
                // Replace the "."
                if (nDotIndex > 0 && sDecimalSeparator !== '.') {
                    sOutput = sOutput.replace('.', sDecimalSeparator);
                }
                // Add missing zeros
                if (config.addMissingZeroes) {
                    while ((sOutput.length - 1 - nDotIndex) < nDecimalPlaces) {
                        sOutput += '0';
                    }
                }
            }
        }

        // Add the thousands separator
        if (config.thousandsSeparator) {
            const sThousandsSeparator = config.thousandsSeparator;
            nDotIndex = sOutput.lastIndexOf(sDecimalSeparator);
            nDotIndex = (nDotIndex > -1) ? nDotIndex : sOutput.length;
            let sNewOutput = sOutput.substring(nDotIndex);
            let nCount = -1;
            for (let i = nDotIndex; i > 0; i--) {
                nCount++;
                if ((nCount % 3 === 0) && (i !== nDotIndex)) {
                    sNewOutput = sThousandsSeparator + sNewOutput;
                }
                sNewOutput = sOutput.charAt(i - 1) + sNewOutput;
            }
            sOutput = sNewOutput;
        }

        // Prepend prefix
        sOutput = (config.prefix) ? config.prefix + sOutput : sOutput;

        // Append suffix
        sOutput = (config.suffix) ? sOutput + config.suffix : sOutput;

        return sOutput;
    }
    // Still not a Number, just return unaltered

    return data;
}
