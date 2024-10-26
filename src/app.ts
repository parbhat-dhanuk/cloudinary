import express from 'express';
import productRoutes from './routes/productRoutes';
import dotenv from 'dotenv';
import connectToDatabase from './database/database';


connectToDatabase()
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/products', productRoutes);



  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });