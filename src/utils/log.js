/**
 * Outputs warning message to the browser console.
 *
 * @param  {String} msg
 */
export function error(msg) {
    console.error(`[Courier error]: ${msg}`);
}

/**
 * Outputs success message to the browser console.
 *
 * @param  {String} msg
 */
export function success(msg) {
    console.log(`%c[Courier success]: ${msg}`, 'color: #5cd03a');
}

/**
 * Outputs warning message to the browser console.
 *
 * @param  {String} msg
 */
export function warn(msg) {
    console.log(`%c[Courier warn]: ${msg}`, 'color: #e4ac20');
}

/**
 * Outputs message to the browser console.
 *
 * @param  {String} msg
 */
export function log(msg) {
    console.log(`%c[Courier log]: ${msg}`, 'color: #212121');
}
