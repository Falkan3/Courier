/**
 * Find a predefined reply from the scenario property in settings.
 *
 * @param  {Object} scenario    Message scenario.
 * @param  {string} msg         The message.
 * @param  {string} path        The topic's path.
 */
export function replyFromScenario(scenario, msg, path) {
    if (path && scenario[path]) {
        return scenario[path];
    }
    return null;
}

export default replyFromScenario;
