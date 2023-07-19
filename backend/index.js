import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import notes from "./data/notes.js";
import connectdb from "./config/db.js";
import userRouter from "./routes/userRoutes.js"
import notesRouter from "./routes/notesRoute.js"


const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();
connectdb();

app.get('/', (req, res) => {
    res.send('Server is running')
})

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
});

app.use('/user', userRouter);
app.use('/notes', notesRouter)

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server started on port :${PORT}`)
})