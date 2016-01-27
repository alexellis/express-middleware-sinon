module.exports = function(privateUrls, publicUrls, tokenValidator) {
	return function(req, res, next) {
		if(req.url) {
			if(publicUrls.indexOf(req.url) >- 1) {
				res.status(200);
				res.send({"response": "OK", resource: {name: req.url}});
			} else {
				if(privateUrls.indexOf(req.url) > -1) {
					if(req.headers && req.headers["token"]) {
						var token = req.headers["token"];
						if(tokenValidator.validate(token)) {
							res.status(200);
							res.send({"response": "OK", resource: {name: req.url}});
						}
						else {
							res.status(403);
						}
					}
				}
			}
		}
		else {
			res.status(500);
		}

		res.end();
		next();
	};
}
