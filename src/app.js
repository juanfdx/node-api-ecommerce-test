import express from 'express';
import cors from 'cors';
import { StatusCodes } from 'http-status-codes';
// import { ALLOWED_ORIGIN } from './config/index.js';
//ROUTES FOLDER
import productRoutes from './routes/product.routes.js';


const app = express();

//MIDDLEWARES
app.use(express.json());


// app.use(cors({
//   origin: ALLOWED_ORIGIN,
//   methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], // Add other methods if needed
// }));;



import { corsOptions } from './config/cors.js';

app.use(cors(corsOptions));


//API ROUTES
app.use('/api/v1/products', productRoutes);



/* ------------------------
  CORS Error Handler 
 ------------------------*/
app.use((err, req, res, next) => {
  if (err.message?.startsWith('CORS blocked')) {
    return res.status(403).json({
      error: err.message,
    });
  }
  next(err);
});

/*-------------------------
  🚫 404 - Route Not Found
 ------------------------ */
app.all(/.*/, (req, res) => {
  res
    .status(StatusCodes.NOT_FOUND)
    .json({ error: 'Route not found' });
});


/*-------------------------
  ❌ Global Error Handler
 ------------------------ */
app.use((err, req, res, next) => {
  console.error('🔥 ERROR:', err);

  res.status(err.status || StatusCodes.INTERNAL_SERVER_ERROR).json({
    error: err.message || 'Internal Server Error',
  });
});



export default app;
