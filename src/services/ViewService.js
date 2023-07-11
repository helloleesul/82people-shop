const express = require('express');
const path = require('path');

const ViewService = {
	serveStatic: resource => {
		const pathName = path.join(__dirname, `../views/${resource}`);
		const option = { index: `${resource}.html` };

		return express.static(pathName, option);
	},
};

module.exports = ViewService;
