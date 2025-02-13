import data from '../../package.json' with { type: 'json' };

export default `/*!
 * Courier.js v${data.version}
 * (c) 2020-${new Date().getFullYear()} ${data.author}
 * Released under the ${data.license} License.
 */
`;
