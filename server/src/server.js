import express, { json } from 'express';
import authRoutes from './routes/auth';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import dotenv from 'dotenv';


dotenv.config();
const app = express();
app.use(express.json()); //alternative to body-parser to allow decoding of JSON data in request object

// connect to db
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then(() => console.log('DB connected'))
.catch(err => console.log('DB connection ERROR: ', err));

// morgan allows us to get server side feedback for each router/request.
app.use(morgan('dev')); 

// use cors module to define accepted request sources 
if (process.env.NODE_ENV = 'development'){
    app.use(cors({origin: `http://localhost:3000`}))
}


// middleware
app.use('/api', authRoutes);


const port = process.env.PORT || 5000;
app.listen(port, ()=> console.log(`Server listening on port ${port} - ${process.env.NODE_ENV}`));