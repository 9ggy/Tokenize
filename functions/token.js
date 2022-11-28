const getHalfToken = function (userId) {
	return Buffer.from(userId).toString('base64');
}

module.exports = { getHalfToken };
