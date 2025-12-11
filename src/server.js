import dotenv from 'dotenv';
import app from './app.js';
import { connectDB } from './config/db.js';
import { isDevelopment } from './config/index.js';


dotenv.config({ quiet: true });

//DB CONNECTION
connectDB();


//DEPLOY
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT} in ${
      isDevelopment ? 'development' : 'production'
    } mode`
  );
});