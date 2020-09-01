/**
 * Test
 *
 * @param  {Object} Courier
 * @param  {Object} Components
 * @return {Object}
 */
export default function (Courier, Components) {
    return {
        /**
         * Test
         *
         * @param  {Number} input
         * @return {Number}
         */
        modify(input) {
            let i = 0;
            if (Courier.rootElement) {
                i++;
            }
            if (Components) {
                i++;
            }
            return input * input + i;
        },
    };
}
