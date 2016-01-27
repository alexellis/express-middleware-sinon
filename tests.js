var chai= require('chai');
var expect = chai.expect;

describe("middleware", function() {
	var middle;
	var req;
	var res;
	var resCode;
	beforeEach(function() {
		middle=require('./middle');

		req={
		};
		res={
			status: function(code) {
				resCode=code;
			},
			send: function() {
			},
			end: function(){ }
		};
	});
	it("banned URL fails status code 403", function(done) {
		req.url = "/admin";
		middle(req, res, function() {
			expect(resCode).to.equal(403);
			done();
		});
	});
	it("passes gives status code 200", function(done) {
		req.url = "/";
		middle(req, res, function() {
			expect(resCode).to.equal(200);
			done();
		});
	});
	it("passes on to next", function(done) {
		middle(req, res, function() {
			done();
		});
	});
});
