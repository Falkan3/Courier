/**
 * Returns current time.
 *
 * @return {Number}
 */
export function now() {
    return new Date().getTime();
}

export function getDate(dateTimeString) {
    const date = dateTimeString ? new Date(dateTimeString) : new Date();
    return `${date.getFullYear()}/${(`0${date.getUTCMonth() + 1}`).slice(-2)}/${(`0${date.getDate()}`).slice(-2)}`;
}

export function getTime(dateTimeString) {
    const date = dateTimeString ? new Date(dateTimeString) : new Date();
    return `${(`0${date.getHours()}`).slice(-2)}:${(`0${date.getMinutes()}`).slice(-2)}:${(`0${date.getSeconds()}`).slice(-2)}`;
}

export function getDateTime() {
    return `${getDate()} ${getTime()}`;
}

export function dateIsToday(dateTimeString) {
    return new Date(dateTimeString).setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0);
}

export function shortenTodaysDateTime(dateTimeString) {
    return dateIsToday(dateTimeString) ? getTime(dateTimeString) : getDateTime(dateTimeString);
}

export default now;
