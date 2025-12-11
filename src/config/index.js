
export const isDevelopment = process.env.NODE_ENV !== 'production';

export const ALLOWED_ORIGIN = isDevelopment
? process.env.DEV_ORIGIN
: process.env.PROD_ORIGIN;

export const PORT = process.env.PORT || 5000;