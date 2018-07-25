/**
 * This will provide the core functions for the nools usage
 *
 * @author Jack <jack@thinkingcloud.info>
 * @version 0.0.1
 * @date Wed Jul 25 11:46:31 2018
 */

const {
    configure
} = require("hot-pepper-jelly/node");

const nools = require("nools");

const {
    Observable
} = require("rxjs/Observable");

const {
    map,
    flatMap
} = require("rxjs/operators");

const { of
} = require("rxjs/observable/of");

const isObject = require("lodash/isObject");
const isFunction = require("lodash/isFunction");
const isArray = require("lodash/isArray");
const extend = require("lodash/extend");
const keys = require("lodash/keys");
const assert = require("assert");

/**
 * Construct the flow using the rules callback, which will ake the usage of nools easier
 */
const constructFlows = (rules) => {
    let ret = {}
    if (isObject(rules)) {
        for (let rule in rules) {
            let m = rules[rule];
            if (isFunction(m)) {
                m = [m];
            }
            if (isArray(m)) {
                ret[rule] = nools.flow(rule, (flow) => {
                    for (let c of m) {
                        c(flow, {
                            Value
                        });
                    }
                });
            }
        }
    }
    return ret;
}

/**
 * Get the flows using the configuration
 */
const configureFlows = (config = "./rules.yaml", mod = null) => {
    return configure(config, mod)
        .map(conf => constructFlows(conf.rules));
}

/**
 * This is the short hand for configure -> get rule -> get session -> match
 */
const run= (config = "./rules.yaml", rule = "default", mod = null) => {
    return {
        "with": (...args) => configureFlows(config, mod)
            .pipe(map(getSession(rule, ...args)), flatMap(matchSession))
    }
}

const getSession = (rule, ...args) => {
    return (rules) => {
        let r = rules[rule];
        assert(r, `No rule "${rule}" in the rules!`);
        return r.getSession(...args);
    };
}

const matchSession = (session) => {
    return Observable.create(obs => {
        session.match(() => {
            obs.next(session);
            obs.complete();
        });
    });
}

/**
 * This is the default implementation for the value, which will provide the
 * basic functions that will be used in the rules
 */
class Value {
    constructor(props) {
        // Let's copy the props
        extend(this, props);
    }

    is(type) {
        return this.type === type;
    }

    json() {
        return JSON.stringify(this);
    }

    sameType(obj) {
        if(obj && obj.type) {
            return this.is(obj.type);
        }
    }

    keys() {
        return keys(this);
    }
}

module.exports = {
    constructFlows,
    configureFlows,
    getSession,
    matchSession,
    run,
    Value
}
