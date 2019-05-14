export const base64 = str => Buffer.from(str, 'utf8').toString('base64');
export const unbase64 = str => Buffer.from(str, 'base64').toString('utf8');
