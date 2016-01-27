'use strict';

var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var middleModule = require('./middle');

describe("middleware", function () {
    var sandbox = sinon.sandbox.create();
    var middle;
    var req;
    var res;
    var resCode;

    var privateUrls;
    var publicUrls;
    var tokenValidator;

    beforeEach(function () {
    	privateUrls = [];
    	publicUrls = [];
    	tokenValidator = sandbox.stub();
    	tokenValidator.validate = sandbox.stub();
    	middle = middleModule(privateUrls, publicUrls, tokenValidator);

        req = sandbox.stub();
        req.headers=sandbox.stub();
        res = sandbox.stub();
        res.status = sandbox.spy();
        res.send = sandbox.stub();
        res.end = sandbox.stub();

    });

    afterEach(function () {
        sandbox.restore();
    });

    it("private URL invalid token gives status code 403", function (done) {
    	privateUrls.push("/admin");
    	tokenValidator.validate.withArgs("token2").returns(false);

        req.url = "/admin";
        req.headers["token"] = "token2";

        middle(req, res, function () {
            expect(res.status.calledOnce).to.be.true;
            expect(res.status.getCall(0).args[0]).to.equal(403);
            done();
        });
    });

    it("private URL valid token gives status code 200", function (done) {
    	privateUrls.push("/admin");
    	tokenValidator.validate.withArgs("token1").returns(true);

        req.url = "/admin";
        req.headers["token"] = "token1";

        middle(req, res, function () {
            expect(res.status.calledOnce).to.be.true;
            expect(res.status.getCall(0).args[0]).to.equal(200);
            done();
        });
    });
 
    it("public URL returns status code 200 without token", function (done) {
    	publicUrls.push("/main/");
    	req.url = "/main/"

        middle(req, res, function () {
            expect(res.status.calledOnce).to.be.true;

            expect(res.status.getCall(0).args[0]).to.equal(200);
            done();
        });
    });

    it("passes on to next", function (done) {
        middle(req, res, function () {
            done();
        });
    });
});
