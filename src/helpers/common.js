const { ObjectID } = require('mongodb');
const fs = require('fs');
var https = require('https');
const axios = require('axios');
var crypto = require('crypto');
const path = require('path');
const _ = require('lodash');

function uniqueName() {
	var id = new ObjectID().toHexString();
	return id;
}

function removeFile(path) {
	if (fs.existsSync(path)) {
		fs.unlinkSync(path);
	}
}

const getClientIpAddress = (req) => {
	let ipAddress;
	// The request may be forwarded from local web server.
	const forwardedIpsStr = req.header('x-forwarded-for');
	if (forwardedIpsStr) {
		// 'x-forwarded-for' header may return multiple IP addresses in
		// the format: "client IP, proxy 1 IP, proxy 2 IP" so take the
		// the first one
		const forwardedIps = forwardedIpsStr.split(',');
		ipAddress = forwardedIps[0];
	}
	if (!ipAddress) {
		// If request was not forwarded
		ipAddress = req.connection.remoteAddress;
	}
	return ipAddress;
};

const mapIpToLocation = async (ip) => {
	let location = null;
	try {
		const response = await axios.get(`http://ip-api.com/json/${ip}`);
		if (response.data.status === 'success')
			location = {
				country: response.data.country,
				city: response.data.city,
			};
	} catch (e) {}
	return location;
};

function randomValueBase64(len) {
	return crypto
		.randomBytes(Math.ceil((len * 3) / 4))
		.toString('base64') // convert to base64 format
		.slice(0, len) // return required number of characters
		.replace(/\+/g, '0') // replace '+' with '0'
		.replace(/\//g, '0'); // replace '/' with '0'
}

function mkDirByPathSync(targetDir, { isRelativeToScript = false } = {}) {
	const sep = path.sep;
	const initDir = path.isAbsolute(targetDir) ? sep : '';
	const baseDir = isRelativeToScript ? __dirname : '.';

	return targetDir.split(sep).reduce((parentDir, childDir) => {
		const curDir = path.resolve(baseDir, parentDir, childDir);
		try {
			fs.mkdirSync(curDir);
		} catch (err) {
			if (err.code === 'EEXIST') {
				// curDir already exists!
				return curDir;
			}

			// To avoid `EISDIR` error on Mac and `EACCES`-->`ENOENT` and `EPERM` on Windows.
			if (err.code === 'ENOENT') {
				// Throw the original parentDir error on curDir `ENOENT` failure.
				throw new Error(`EACCES: permission denied, mkdir '${parentDir}'`);
			}

			const caughtErr = ['EACCES', 'EPERM', 'EISDIR'].indexOf(err.code) > -1;
			if (!caughtErr || (caughtErr && targetDir === curDir)) {
				throw err; // Throw if it's just the last created dir.
			}
		}

		return curDir;
	}, initDir);
}

module.exports = {
	uniqueName,
	removeFile,
	mapIpToLocation,
	randomValueBase64,
	getClientIpAddress,
	mkDirByPathSync,
};
