const atob = str => Buffer.from(str, 'utf8').toString('base64');
const btoa = str => Buffer.from(str, 'base64').toString('utf8');

exports.atob = atob;
exports.btoa = btoa;
