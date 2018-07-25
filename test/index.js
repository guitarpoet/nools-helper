/**
 * This is the test case that used for testing
 *
 * @author Jack <jack@thinkingcloud.info>
 * @version 0.0.1
 * @date Wed Jul 25 12:00:51 2018
 */

const {
    run
} = require("../index");

const isArray = require("lodash/isArray");
const assert = require("assert");

const {
    map,
    flatMap
} = require("rxjs/operators");

describe("Core Test", () => {
    describe("Test Run", () => {
        it("Normal Run", (done) => {
            run("./sample.yaml", "sample", module)
                .with("Jack")
                .map(session => session.getFacts(String))
                .subscribe(data => {
                    assert(isArray(data), "Data is not array");
                    assert.equal(data.length, 3);
                    assert.notEqual(data.indexOf("Jack"), -1);
                    assert.notEqual(data.indexOf("Hello, Jack"), -1);
                    assert.notEqual(data.indexOf("Goodbye, Jack"), -1);
                    done();
                });
        });
    });
});
