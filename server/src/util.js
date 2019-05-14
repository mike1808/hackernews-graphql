const btoa = str => Buffer.from(str, 'utf8').toString('base64');
const atob = str => Buffer.from(str, 'base64').toString('utf8');

export { atob };
export { btoa };
