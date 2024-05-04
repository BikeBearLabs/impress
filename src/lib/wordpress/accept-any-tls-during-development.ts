'use server';

if (typeof process !== 'undefined' && process.env.NODE_ENV === 'development')
	process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
