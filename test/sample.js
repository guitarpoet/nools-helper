/**
 * This is the rule file for test
 *
 * @author Jack <jack@thinkingcloud.info>
 * @version 0.0.1
 * @date Wed Jul 25 11:54:30 2018
 */

const { of } = require("rxjs/observable/of");

const hello = (flow) => {
    // Let's add the hello rules
    flow.rule("hello", [
        [String, "name", "name.indexOf('Hello') == -1 && name.indexOf('Goodbye') == -1"],
    ], (facts, session) => {
        session.assert(`Hello, ${facts.name}`);
    });
    return of(flow);
}

const good_bye = (flow) => {
    // Let's add the hello rules
    flow.rule("goodbye", [
        [String, "name", "name.indexOf('Hello') == -1 && name.indexOf('Goodbye') == -1"],
    ], (facts, session) => {
        session.assert(`Goodbye, ${facts.name}`);
    });
    return of(flow);
}

module.exports = {
    hello, good_bye
}
