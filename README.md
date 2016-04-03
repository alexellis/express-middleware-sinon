# express-middleware-sinon

[![Build Status](https://travis-ci.org/alexellis/express-middleware-sinon.svg?branch=master)](https://travis-ci.org/alexellis/express-middleware-sinon)

### Testing an express middleware with Sinon and Mocha


#### Getting started

Installation can be done with `npm install`, it will add express, chai, sinon and mocha as dependencies.

Once the dependencies are installed you can use the `npm test` command to execute the unit tests.

#### Middleware and its tests

The middleware's purpose is to enforce a valid security token for all URLs classed as private. Public URLs do not need to be validated. That gives us the following three unit tests:

* private URL invalid token gives status code 403
* private URL valid token gives status code 200
* public URL returns status code 200 without token

#### Sinon

Sinon is a mocking/stubbing framework which can help set up test data and fake out collaborating objects/methods for code we are testing.

**Stub**

Stubs can be used to return canned values from method calls, either by extending existing functions or by creating new ones.

**Stubbing a new method**

```
var sum = sinon.stub();
func.returns(10)
console.log(func(5,6));   // Gives 10!
```

**Spy**

A spy can be used to record how many times a method has been called and with what parameters.

```
var sum = sinon.spy();
var call1 = sum.getCall(0);
call1(5,6)
console.log(call1.args[0]) // Gives 5
console.log(call1.args[1]) // Gives 6
```

**Sandboxes**

A sandbox can be used to provide stubs and spies and keep track of them. At a later time we can call `sandbox.restore()` to clear out all recorded results in objects we created so far.

```
var sandbox = sinon.sandbox.create()
var sumSpy = sandbox.spy();
sumSpy(5,7);
sandbox.restore();
```

#### mocha/chai

Mocha is a unit test runner, which also provides a DSL very similar to RSpec from the Ruby world.

```
describe("test suite", function() {
    it("adds 2 and 2 giving 4", function() {
      var calc1 = new Calc();
      assert.ok(calc1.sum(2, 2));
    });
});
```

Chai provides several fluent assertion libraries that are designed to make tests more readable than using the built-in `assert.ok()` above.

Here is the previous example repeated with the chai/expect assertion library.

```
it("adds 2 and 2 giving 4", function() {
  var calc1 = new Calc();
  expect(calc1.sum(2, 2)).to.equal(4);
});
```
