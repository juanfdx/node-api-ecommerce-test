export const isDevelopment = process.env.NODE_ENV !== 'production';

// export const ALLOWED_ORIGIN = isDevelopment
//   ? [process.env.DEV_ORIGIN]
//   : [
//       process.env.PROD_ORIGIN,
//       process.env.DEV_ORIGIN, // allow localhost even in prod
//     ];
