import express from 'express';
import dotenv from 'dotenv'
import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';
import connectDB from './db/connect.js'

//router
import userRouter from './routes/userRoutes.js'

const app = express();
dotenv.config()
app.use(express.json())
app.use('/api/users', userRouter)

app.get('/', (req, res) => {
    res.send('Welcome!');
});

const start = async() =>{
    try{
        await connectDB(process.env.MONGO_URL)
        app.listen(port,()=>{
            console.log(`Server is listening to ${port}`)
        })
    }catch(error){
        console.log(error)
    }
}
start()



// //middleware
notFoundMiddleware
errorHandlerMiddleware

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000;
