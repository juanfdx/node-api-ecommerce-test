

const allowedOrigins = new Set(
  [process.env.DEV_ORIGIN, process.env.PROD_ORIGIN].filter(Boolean) // removes undefined values
);

export const corsOptions = {
  origin: (origin, callback) => {
    // Allow server-to-server, Postman, curl (no origin)
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.has(origin)) {
      return callback(null, true);
    }

    return callback(new Error(`CORS blocked for origin: ${origin}`), false);
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true,
};
